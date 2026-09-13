import { useLocation, useNavigate, Link } from "react-router-dom";

const FALLBACK_ORDER = {
  orderId: "LL9876543210",
  items: [
    {
      id: 1,
      title: "The Hidden Forest",
      author: "Elara Vance",
      price: 24.99,
      quantity: 1,
      cover: "",
    },
    {
      id: 2,
      title: "Wuthering Heights",
      author: "Emily Brontë",
      price: 12.5,
      quantity: 1,
      cover: "",
    },
  ],
  subtotal: 37.49,
  shippingCost: 5.99,
  tax: 2.81,
  total: 46.29,
  shippingAddress: {
    name: "Jane Doe",
    line1: "123 Maple Avenue, Apt 4B",
    line2: "Springfield, IL 62704",
  },
  paymentMethod: "Visa **** 1234",
  estimatedDelivery: "Oct 26, 2023 - Oct 28, 2023",
};

export default function OrderConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order ?? FALLBACK_ORDER;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Success header card */}
      <div className="bg-white rounded-2xl border border-[#E8E4D9] text-center px-8 py-10 mb-8 relative">
        {/* Checkmark circle — sits half above the card */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="w-20 h-20 rounded-full bg-[#2C3A1E] flex items-center justify-center shadow-md">
            <svg
              className="w-10 h-10 text-white"
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
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2C3A1E] mb-2">
          Thank you for your order!
        </h1>
        <p className="text-sm text-[#5C5C4F]">Order #{order.orderId}</p>
        <p className="text-sm text-[#5C5C4F] mt-1">
          Estimated Delivery: {order.estimatedDelivery}
        </p>
      </div>

      {/* Two-column detail panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Your Order Items */}
        <div className="bg-white rounded-2xl border border-[#E8E4D9] p-5">
          <h2 className="text-base font-bold text-[#1C1C1C] mb-4">
            Your Order Items
          </h2>

          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 gap-y-1 text-xs font-semibold text-[#5C5C4F] mb-2 border-b border-[#E8E4D9] pb-2">
            <span>Title</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Price</span>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-12 rounded overflow-hidden bg-[#F0EDE4] flex-shrink-0">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/40x48/e8e4d9/8a8070?text=${encodeURIComponent(item.title[0])}`;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#1C1C1C] truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[#7A7A68]">{item.author}</p>
                  </div>
                </div>
                <span className="text-sm text-[#1C1C1C] text-center">
                  {item.quantity}
                </span>
                <span className="text-sm font-semibold text-[#1C1C1C] text-right">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Summary */}
        <div className="bg-white rounded-2xl border border-[#E8E4D9] p-5">
          <h2 className="text-base font-bold text-[#1C1C1C] mb-4">
            Shipping &amp; Payment Summary
          </h2>

          <div className="mb-4">
            <p className="text-xs font-semibold text-[#5C5C4F] mb-1">
              Shipping Address
            </p>
            <p className="text-sm text-[#1C1C1C]">
              {order.shippingAddress.name}
            </p>
            <p className="text-sm text-[#5C5C4F]">
              {order.shippingAddress.line1}
            </p>
            <p className="text-sm text-[#5C5C4F]">
              {order.shippingAddress.line2}
            </p>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-[#5C5C4F] mb-1">
              Payment Method
            </p>
            <p className="text-sm text-[#1C1C1C]">{order.paymentMethod}</p>
          </div>

          <div className="space-y-2 text-sm border-t border-[#E8E4D9] pt-4">
            <div className="flex justify-between">
              <span className="text-[#5C5C4F]">Subtotal</span>
              <span className="text-[#1C1C1C]">
                ${order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C5C4F]">Shipping</span>
              <span className="text-[#1C1C1C]">
                Standard - ${order.shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5C5C4F]">Estimated Tax</span>
              <span className="text-[#1C1C1C]">${order.tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t border-[#2C3A1E] mt-4 pt-4">
            <span className="text-base font-bold text-[#1C1C1C]">Total</span>
            <span className="text-base font-bold text-[#1C1C1C]">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Continue Shopping button */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/")}
          className="px-10 py-3 bg-[#C4622D] text-white font-bold rounded-full hover:bg-[#A85226] transition-colors text-base"
        >
          Continue Shopping
        </button>
      </div>

      {/* Need Help */}
      <div className="text-center mb-4">
        <p className="text-sm font-semibold text-[#1C1C1C]">Need Help?</p>
        <p className="text-sm text-[#5C5C4F]">
          <Link to="/faq" className="hover:underline text-[#5C5C4F]">
            FAQ
          </Link>
          {" | "}
          <Link to="/contact" className="hover:underline text-[#5C5C4F]">
            Contact Us
          </Link>
        </p>
      </div>
    </div>
  );
}
