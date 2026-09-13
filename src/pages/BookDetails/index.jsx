import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { books as localBooks } from "../../data/books";
import { api } from "../../api";
import { useCart } from "../../context/CartContext";
import { StarIcon } from "../../components/Icons";

function StarRating({ rating, size = "w-4 h-4" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`${size} ${i < Math.floor(rating) ? "text-amber-500" : i < rating ? "text-amber-300" : "text-[#D4CFC0]"}`}
          filled={i < rating}
        />
      ))}
    </div>
  );
}

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [book, setBook] = useState(localBooks.find((item) => item.id === id));

  useEffect(() => {
    api
      .book(id)
      .then(({ book: remoteBook }) => setBook(remoteBook))
      .catch(() => {});
  }, [id]);

  const related = localBooks.filter((item) => item.id !== id).slice(0, 5);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1C1C1C] mb-4">
          Book not found
        </h1>
        <Link to="/catalogue" className="text-[#C4622D] hover:underline">
          Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(book);
  };

  return (
    <div className="bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#7A7A68] mb-8">
          <Link
            to="/catalogue"
            className="hover:text-[#C4622D] transition-colors"
          >
            Catalogue
          </Link>
          <span>/</span>
          <Link
            to={`/catalogue?cat=${encodeURIComponent(book.category)}`}
            className="hover:text-[#C4622D] transition-colors"
          >
            {book.category}
          </Link>
          <span>/</span>
          <span className="text-[#1C1C1C] font-medium">{book.title}</span>
        </nav>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* Cover */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <div className="w-64 sm:w-72 rounded-xl overflow-hidden shadow-lg bg-[#F0EDE4]">
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = `https://placehold.co/300x400/e8e4d9/8a8070?text=${encodeURIComponent(book.title)}`;
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3A1E] mb-2">
              {book.title}
            </h1>
            <p className="text-lg text-[#5C5C4F] mb-3">{book.author}</p>

            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={book.rating} />
              <span className="text-sm text-[#7A7A68]">
                ({book.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <p className="text-sm text-[#7A7A68] mb-5">
              {book.category} / Magical Realism
            </p>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#1C1C1C]">
                ${book.price.toFixed(2)}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#2C3A1E] text-[#FAF9F5] text-xs font-medium">
                Forest Green
              </span>
            </div>

            <p className="text-sm text-[#5C5C4F] leading-relaxed mb-8 max-w-lg">
              {book.description}
            </p>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center border border-[#D4CFC0] rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors text-lg font-medium"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm font-medium text-[#1C1C1C]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#5C5C4F] hover:bg-[#F0EDE4] transition-colors text-lg font-medium"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!book.inStock}
                className="px-8 py-2.5 bg-[#C4622D] text-white font-semibold rounded-lg hover:bg-[#A85226] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add to Cart
              </button>
            </div>

            <button
              onClick={() => navigate("/catalogue")}
              className="mt-4 text-sm text-[#7A7A68] hover:text-[#C4622D] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* You May Also Like */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {related.map((rel) => (
              <Link key={rel.id} to={`/books/${rel.id}`} className="group">
                <div className="rounded-lg overflow-hidden bg-[#F0EDE4] aspect-[2/3] mb-2">
                  <img
                    src={rel.cover}
                    alt={`Cover of ${rel.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/200x300/e8e4d9/8a8070?text=Book`;
                    }}
                  />
                </div>
                <h3 className="text-xs font-semibold text-[#1C1C1C] group-hover:text-[#C4622D] transition-colors line-clamp-2 mb-0.5">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#7A7A68] mb-1">{rel.author}</p>
                <div className="flex items-center gap-1 mb-1">
                  <StarRating rating={rel.rating} size="w-3 h-3" />
                  <span className="text-xs text-[#7A7A68]">(3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1C1C1C]">
                    ${rel.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${rel.inStock ? "bg-[#EAF2E6] text-[#2C5A1E]" : "bg-red-50 text-red-600"}`}
                  >
                    {rel.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
