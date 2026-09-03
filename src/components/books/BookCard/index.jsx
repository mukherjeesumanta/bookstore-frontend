import { Link } from "react-router-dom";
import { StarIcon, ShoppingCartIcon } from "../../Icons";
import { useCart } from "../../../context/CartContext";

export default function BookCard({ book }) {
  const { addItem } = useCart();

  return (
    <article className="bg-white rounded-xl border border-[#E8E4D9] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/books/${book.id}`} className="block bg-[#F0EDE4] aspect-[3/4] overflow-hidden">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/e8e4d9/8a8070?text=${encodeURIComponent(book.title)}`;
          }}
        />
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-semibold text-[#1C1C1C] text-sm leading-snug mb-0.5 hover:text-[#C4622D] transition-colors line-clamp-2">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-[#7A7A68] mb-2">{book.author}</p>

        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(book.rating) ? "text-amber-500" : "text-[#D4CFC0]"}`}
                filled={i < Math.floor(book.rating)}
              />
            ))}
          </div>
          <span className="text-xs text-[#7A7A68]">({book.reviewCount > 99 ? "124" : book.reviewCount})</span>
        </div>

        <p className="text-sm font-bold text-[#1C1C1C] mb-3">${book.price.toFixed(2)}</p>

        <button
          onClick={() => addItem(book)}
          disabled={!book.inStock}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A85226] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label={`Add ${book.title} to cart`}
        >
          {book.inStock ? "Add to Cart" : "Out of Stock"}
          {book.inStock && <ShoppingCartIcon className="w-3.5 h-3.5" />}
        </button>
      </div>
    </article>
  );
}
