import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CheckCircleIcon, ChevronRightIcon } from "../../components/Icons";

const STEPS = [
  { num: 1, label: "Cart", done: true },
  { num: 2, label: "Checkout", active: true },
  { num: 3, label: "Payment" },
  { num: 4, label: "Confirmation" },
];

const SHIPPING_OPTIONS = [
  { id: "standard", label: "Standard Shipping", days: "3-5 days", price: 5.99 },
  { id: "express", label: "Express Shipping", days: "1-2 days", price: 14.99 },
];

function StepIndicator() {
  return (
    <div className="flex items-center gap-0 mb-8 overflow-x-auto">
      {STEPS.map((step, idx) => (
        <div key={step.num} className="flex items-center">
          <div
            className={`flex items-center gap-2 ${step.active ? "text-[#1C1C1C]" : step.done ? "text-[#2C3A1E]" : "text-[#9A9A85]"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 flex-shrink-0
                ${
                  step.active
                    ? "bg-[#2C3A1E] text-white border-[#2C3A1E]"
                    : step.done
                      ? "bg-white border-[#2C3A1E] text-[#2C3A1E]"
                      : "bg-white border-[#D4CFC0] text-[#9A9A85]"
                }`}
            >
              {step.done && !step.active ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.num
              )}
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap ${step.active ? "font-bold" : ""}`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`h-px w-12 sm:w-20 mx-2 flex-shrink-0 ${idx === 0 ? "bg-[#2C3A1E]" : "bg-[#D4CFC0]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Checkout() {
  const { cart, subtotal } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState("standard");
  const shippingCost =
    SHIPPING_OPTIONS.find((o) => o.id === shipping)?.price ?? 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const [form, setForm] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    fullName: "",
    apt: "",
    street: "123 Birch Lane",
    state: "VT",
    postal: "05482",
    city: "Shelburne",
    country: "United States",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment");
  };

  const inputClass = (field) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C4622D] transition-colors ${
      errors[field]
        ? "border-[#C4622D] bg-[#FFF8F5]"
        : "border-[#E8E4D9] bg-white"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <StepIndicator />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="flex-1 min-w-0">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-[#E8E4D9] p-6 sm:p-8"
          >
            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-5">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#C4622D]">
                      Invalid email format
                    </p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass("phone")}
                  />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-5">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClass("fullName")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Apt/Suite
                  </label>
                  <input
                    name="apt"
                    value={form.apt}
                    onChange={handleChange}
                    className={inputClass("apt")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Street Address
                  </label>
                  <input
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    className={inputClass("street")}
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                      State/Province
                    </label>
                    <select
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className={inputClass("state")}
                    >
                      {[
                        "AL",
                        "AK",
                        "AZ",
                        "AR",
                        "CA",
                        "CO",
                        "CT",
                        "DE",
                        "FL",
                        "GA",
                        "HI",
                        "ID",
                        "IL",
                        "IN",
                        "IA",
                        "KS",
                        "KY",
                        "LA",
                        "ME",
                        "MD",
                        "MA",
                        "MI",
                        "MN",
                        "MS",
                        "MO",
                        "MT",
                        "NE",
                        "NV",
                        "NH",
                        "NJ",
                        "NM",
                        "NY",
                        "NC",
                        "ND",
                        "OH",
                        "OK",
                        "OR",
                        "PA",
                        "RI",
                        "SC",
                        "SD",
                        "TN",
                        "TX",
                        "UT",
                        "VT",
                        "VA",
                        "WA",
                        "WV",
                        "WI",
                        "WY",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                      Postal Code
                    </label>
                    <input
                      name="postal"
                      value={form.postal}
                      onChange={handleChange}
                      className={inputClass("postal")}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    City
                  </label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className={inputClass("city")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
                    Country
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={inputClass("country")}
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Delivery Method */}
            <section>
              <h2 className="text-xl font-bold text-[#1C1C1C] mb-5">
                Delivery Method
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHIPPING_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      shipping === opt.id
                        ? "border-[#2C3A1E] bg-[#F5F7F2]"
                        : "border-[#E8E4D9] hover:border-[#B0B898]"
                    }`}
                  >
                    <div className="flex items-center mt-0.5">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={shipping === opt.id}
                        onChange={() => setShipping(opt.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          shipping === opt.id
                            ? "border-[#2C3A1E]"
                            : "border-[#D4CFC0]"
                        }`}
                      >
                        {shipping === opt.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#2C3A1E]" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-[#1C1C1C]">
                          {opt.label}
                        </span>
                        {shipping === opt.id && (
                          <svg
                            className="w-5 h-5 text-[#2C3A1E]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <p className="text-xs text-[#7A7A68] mt-0.5">
                        {opt.days}
                      </p>
                      <p className="text-sm font-medium text-[#1C1C1C] mt-1">
                        ${opt.price.toFixed(2)}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            <button type="submit" className="hidden" id="checkout-submit" />
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-[#F7F5EF] rounded-xl border border-[#E8E4D9] p-5">
            <h2 className="text-base font-bold text-[#1C1C1C] mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {cart.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-10 h-12 rounded overflow-hidden bg-[#E8E4D9] flex-shrink-0">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/40x48/e8e4d9/8a8070?text=B";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1C1C] truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#7A7A68] truncate">
                      {item.author}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#1C1C1C] flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E4D9] pt-3 space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Shipping</span>
                <span className="font-medium">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5C5C4F]">Taxes</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#E8E4D9] pt-3 flex justify-between mb-5">
              <span className="font-bold text-[#1C1C1C]">Total</span>
              <span className="font-bold text-[#1C1C1C]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#C4622D] text-white font-semibold rounded-lg hover:bg-[#A85226] transition-colors text-sm"
            >
              Continue to Payment
              <ChevronRightIcon className="w-4 h-4" />
            </button>

            <div className="mt-4">
              <button className="flex items-center justify-between w-full text-sm text-[#5C5C4F] hover:text-[#1C1C1C] transition-colors">
                <span>Gift Card/Promo Code</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
