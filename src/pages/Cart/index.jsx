import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { XMarkIcon } from "../../components/Icons";

const SHIPPING = 6.50;
const TAX_RATE = 0.08;

export default function Cart() {
  const { cart, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > 100 ? 0 : SHIPPING;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#2C3A1E] mb-4">Your Shopping Cart</h1>
        <p className="text-[#7A7A68] mb-8">Your cart is empty.</p>
        <Link
          to="/catalogue"
          className="inline-block px-6 py-3 bg-[#2C3A1E] text-white font-semibold rounded-lg hover:bg-[#1C2815] transition-colors"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3A1E] mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart items table */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-[#E8E4D9] overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 border-b border-[#E8E4D9] text-xs font-medium text-[#7A7A68] uppercase tracking-wide">
              <span>Title</span>
              <span className="text-right">Unit Price</span>
              <span className="text-center">Quantity Control</span>
              <span className="text-right">Line Total</span>
              <span></span>
            </div>

            {/* Cart rows */}
            {cart.map((item, idx) => (
              <div
                key={item.id}
                className={`flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-6 py-5 ${
                  idx < cart.length - 1 ? "border-b border-[#E8E4D9]" : ""
                }`}
              >
                {/* Book info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Link to={`/books/${item.id}`} className="flex-shrink-0">
                    <div className="w-16 h-20 rounded-md overflow-hidden bg-[#F0EDE4]">
                      <img
                        src={item.cover}
                        alt={`Cover of ${item.title}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/80x100/e8e4d9/8a8070?text=Book`;
                        }}
                      />
                    </div>
                  </Link>
                  <div>
                    <Link to={`/books/${item.id}`}>
                      <h3 className="font-semibold text-[#1C1C1C] text-sm hover:text-[#C4622D] transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#7A7A68] mt-0.5">{item.author}</p>
                    <p className="text-xs text-[#7A7A68]">Hardcover</p>
                  </div>
                </div>

                {/* Unit price */}
                <div className="text-sm font-medium text-[#1C1C1C] text-right">
                  ${item.price.toFixed(2)}
                </div>

                {/* Quantity control */}
                <div className="flex items-center border border-[#D4CFC0] rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-[#1C1C1C]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Line total */}
                <div className="text-sm font-bold text-[#1C1C1C] text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[#9A9A85] hover:text-red-500 transition-colors"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl border border-[#E8E4D9] p-6">
            <h2 className="text-lg font-bold text-[#1C1C1C] mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[#5C5C4F]">Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})</span>
                <span className="font-medium text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5C5C4F]">Estimated Shipping</span>
                <span className="font-medium text-[#1C1C1C]">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5C5C4F]">Estimated Tax</span>
                <span className="font-medium text-[#1C1C1C]">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-[#E8E4D9] pt-4 mb-5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2C3A1E] text-base">Order Total</span>
                <span className="font-bold text-[#C4622D] text-base">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo code */}
            <div className="mb-5">
              <p className="text-sm font-medium text-[#1C1C1C] mb-2">Promo Code</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Add discount code"
                  className="flex-1 px-3 py-2 rounded-lg border border-[#E8E4D9] text-sm text-[#1C1C1C] placeholder-[#9A9A85] focus:outline-none focus:ring-2 focus:ring-[#C4622D]"
                />
                <button className="px-4 py-2 bg-[#2C3A1E] text-white text-sm font-semibold rounded-lg hover:bg-[#1C2815] transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full py-3 bg-[#2C3A1E] text-[#FAF9F5] font-semibold rounded-lg hover:bg-[#1C2815] transition-colors text-sm"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/catalogue"
              className="block text-center mt-3 text-sm text-[#C4622D] hover:underline"
            >
              Continue Shopping
            </Link>

            <p className="text-xs text-[#9A9A85] text-center mt-4 leading-relaxed">
              *Free shipping on orders over $100!<br />
              Express options available.*
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
