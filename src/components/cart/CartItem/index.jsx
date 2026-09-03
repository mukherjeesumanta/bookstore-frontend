import { Link } from "react-router-dom";
import { TrashIcon } from "../../Icons";
import { useCart } from "../../../context/CartContext";

export default function CartItem({ item }) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <li className="flex gap-4 py-5 border-b border-[#E8E4D9] last:border-0">
      {/* Cover */}
      <Link to={`/books/${item.id}`} className="shrink-0 w-16 rounded-lg overflow-hidden bg-[#F0EDE4] border border-[#E8E4D9]">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://placehold.co/64x80/e8e4d9/8a8070?text=Book`;
          }}
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/books/${item.id}`}>
          <p className="font-semibold text-[#1C1C1C] text-sm leading-snug hover:text-[#C4622D] transition-colors truncate">
            {item.title}
          </p>
        </Link>
        <p className="text-xs text-[#7A7A68] mt-0.5">{item.author}</p>
        <p className="text-sm font-bold text-[#1C1C1C] mt-2">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Qty + delete */}
      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => removeItem(item.id)}
          className="text-[#9A9A85] hover:text-red-500 transition-colors p-1"
          aria-label={`Remove ${item.title}`}
        >
          <TrashIcon className="w-4 h-4" />
        </button>

        <div className="flex items-center border border-[#D4CFC0] rounded-lg overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="px-2.5 py-1 text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors text-sm font-medium"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-3 py-1 text-sm font-medium text-[#1C1C1C] border-x border-[#D4CFC0]">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="px-2.5 py-1 text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors text-sm font-medium"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}
