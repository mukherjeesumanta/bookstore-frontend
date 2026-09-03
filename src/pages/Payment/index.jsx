import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { LockClosedIcon } from "../../components/Icons";

const PROGRESS_STEPS = [
  { label: "Shipping", done: true },
  { label: "Delivery", done: true },
  { num: 3, label: "Payment Details", active: true },
];

function CheckoutProgressBar() {
  return (
    <div className="text-center mb-10">
      <p className="text-sm font-semibold text-[#5C5C4F] mb-4 uppercase tracking-wider">Checkout Progress</p>
      <div className="flex items-center justify-center gap-0">
        {PROGRESS_STEPS.map((step, idx) => (
          <div key={step.label} className="flex items-center">
            <div className={`flex items-center gap-2 ${step.active ? "text-[#C4622D]" : "text-[#2C3A1E]"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0
                  ${step.active ? "bg-[#2C3A1E] text-white" : "bg-[#2C3A1E] text-white"}`}
              >
                {step.done && !step.active ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.num || (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                )}
              </div>
              <span className={`text-sm font-medium whitespace-nowrap ${step.active ? "text-[#C4622D] font-bold" : "text-[#1C1C1C]"}`}>
                {step.label}
              </span>
            </div>
            {idx < PROGRESS_STEPS.length - 1 && (
              <div className="h-px w-16 sm:w-24 mx-3 bg-[#2C3A1E]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Payment() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [payMethod, setPayMethod] = useState("card");
  const [saveCard, setSaveCard] = useState(false);
  const [cardForm, setCardForm] = useState({ name: "", number: "", expiry: "", cvv: "" });

  const shippingCost = 6.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e) =>
    setCardForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const orderSnapshot = {
      orderId: "LL" + Math.floor(Math.random() * 9000000000 + 1000000000),
      items: cart.map((i) => ({ ...i })),
      subtotal,
      shippingCost,
      tax,
      total,
      shippingAddress: { name: "Jane Doe", line1: "123 Maple Avenue, Apt 4B", line2: "Springfield, IL 62704" },
      paymentMethod: payMethod === "card" ? `Visa **** ${cardForm.number.slice(-4) || "1234"}` : "PayPal",
      estimatedDelivery: (() => {
        const from = new Date(); from.setDate(from.getDate() + 3);
        const to = new Date(); to.setDate(to.getDate() + 5);
        const fmt = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return `${fmt(from)} - ${fmt(to)}`;
      })(),
    };
    clearCart();
    navigate("/order-confirmation", { state: { order: orderSnapshot } });
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg border border-[#E8E4D9] bg-white text-sm text-[#1C1C1C] placeholder-[#9A9A85] focus:outline-none focus:ring-2 focus:ring-[#C4622D]";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CheckoutProgressBar />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Payment form */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-[#C4622D] mb-6">Payment &amp; Billing</h1>
          <h2 className="text-lg font-bold text-[#2C3A1E] mb-4">Choose Payment Method</h2>

          {/* Payment method tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { id: "card", label: "Credit or Debit Card" },
              { id: "paypal", label: "PayPal" },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${
                  payMethod === method.id
                    ? "border-[#2C3A1E] bg-white"
                    : "border-[#E8E4D9] bg-white hover:border-[#B0B898]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    payMethod === method.id ? "border-[#2C3A1E]" : "border-[#D4CFC0]"
                  }`}
                >
                  {payMethod === method.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#2C3A1E]" />
                  )}
                </div>
                <input
                  type="radio"
                  name="payMethod"
                  value={method.id}
                  checked={payMethod === method.id}
                  onChange={() => setPayMethod(method.id)}
                  className="sr-only"
                />
                {method.id === "paypal" && (
                  <span className="text-[#003087] font-bold text-sm">
                    <span className="text-[#009CDE]">Pay</span>Pal
                  </span>
                )}
                <span className="text-sm font-medium text-[#1C1C1C]">{method.id === "card" ? method.label : ""}</span>
              </label>
            ))}
          </div>

          {payMethod === "card" && (
            <form onSubmit={handlePlaceOrder}>
              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">Card</label>
                  <input name="name" value={cardForm.name} onChange={handleChange} placeholder="Cardholder Name" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      name="number"
                      value={cardForm.number}
                      onChange={handleChange}
                      placeholder="Card Number [YYYY]"
                      maxLength={19}
                      className={`${inputClass} pr-16`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-6 h-4 rounded bg-slate-300 text-xs flex items-center justify-center">MC</div>
                      <div className="w-6 h-4 rounded bg-red-100 text-xs flex items-center justify-center text-red-600">V</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">Expiry Date</label>
                    <input name="expiry" value={cardForm.expiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">CVV</label>
                    <div className="relative">
                      <input name="cvv" value={cardForm.cvv} onChange={handleChange} placeholder="3 digits" maxLength={4} className={`${inputClass} pr-10`} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A85]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D4CFC0] accent-[#2C3A1E]"
                  />
                  <span className="text-sm text-[#5C5C4F]">Save card for future purchases</span>
                </label>
              </div>

              <p className="flex items-center justify-center gap-2 text-xs text-[#7A7A68] mb-4">
                <LockClosedIcon className="w-3.5 h-3.5" />
                All transactions are secured and encrypted.
              </p>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C4622D] text-white font-bold rounded-xl hover:bg-[#A85226] transition-colors text-base"
              >
                Place Order &nbsp; ${total.toFixed(2)}
              </button>
            </form>
          )}

          {payMethod === "paypal" && (
            <div className="text-center py-10">
              <p className="text-[#5C5C4F] mb-4">You will be redirected to PayPal to complete your purchase.</p>
              <button
                onClick={handlePlaceOrder}
                className="px-8 py-3 bg-[#FFC439] text-[#003087] font-bold rounded-xl hover:bg-[#f0b429] transition-colors"
              >
                Pay with PayPal
              </button>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-[#E8E4D9] p-5">
            <h2 className="text-base font-bold text-[#1C1C1C] mb-4">Order Summary</h2>

            <div className="space-y-4 mb-4">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="w-14 h-16 rounded overflow-hidden bg-[#F0EDE4] flex-shrink-0">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://placehold.co/56x64/e8e4d9/8a8070?text=B"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <p className="text-xs font-semibold text-[#1C1C1C] truncate">{item.title}</p>
                      <span className="text-xs font-bold text-[#1C1C1C] flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-[#7A7A68]">{item.author}</p>
                    <p className="text-xs text-[#9A9A85]">Qty. {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E4D9] pt-3 space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Shipping</span>
                <span>Standard - ${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#2C3A1E] pt-3 flex justify-between mb-5">
              <span className="font-bold text-[#1C1C1C] text-base">TOTAL</span>
              <span className="font-bold text-[#C4622D] text-base">${total.toFixed(2)}</span>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#1C1C1C] mb-1">Shipping To:</p>
              <p className="text-xs text-[#5C5C4F]">Sarah Lockwood</p>
              <p className="text-xs text-[#5C5C4F]">45 Oxford Rd, London, UK</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
