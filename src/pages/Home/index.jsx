import { Link } from "react-router-dom";
import { books as localBooks } from "../../data/books";
import { api } from "../../api";
import { useCart } from "../../context/CartContext";
import { StarIcon, ChevronRightIcon } from "../../components/Icons";
import { useEffect, useState } from "react";

const CATEGORIES = [
  "Fiction",
  "Non-Fiction",
  "Classics",
  "Sci-Fi/Fantasy",
  "Mystery",
  "Young Adult",
];

function StarRating({ rating, size = "w-3.5 h-3.5" }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={`${size} ${i < Math.floor(rating) ? "text-amber-500" : "text-[#D4CFC0]"}`}
          filled={i < Math.floor(rating)}
        />
      ))}
    </div>
  );
}

function FeaturedBookCard({ book }) {
  const { addItem } = useCart();
  return (
    <article className="bg-white rounded-xl border border-[#E8E4D9] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <Link
        to={`/books/${book.id}`}
        className="block bg-[#F0EDE4] aspect-[3/4] overflow-hidden"
      >
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
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/books/${book.id}`}>
          <h3 className="font-semibold text-[#1C1C1C] text-sm leading-snug mb-0.5 hover:text-[#C4622D] transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-[#7A7A68] mb-2">{book.author}</p>
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={book.rating} />
          <span className="text-xs text-[#7A7A68]">4.5/5</span>
        </div>
        <p className="text-sm text-[#1C1C1C] font-medium mb-3">
          ${(book.price * 0.85).toFixed(2)}–${book.originalPrice.toFixed(2)}
        </p>
        <button
          onClick={() => addItem(book)}
          className="mt-auto w-full py-2 rounded-lg bg-[#2C3A1E] text-[#FAF9F5] text-sm font-medium hover:bg-[#1C2815] transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function StaffPickCard({ book }) {
  const { addItem } = useCart();
  return (
    <article className="bg-white rounded-xl border border-[#E8E4D9] p-4 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex-1 mb-3">
        <h3 className="font-semibold text-[#1C1C1C] text-sm mb-0.5">
          {book.title}
        </h3>
        <p className="text-xs text-[#7A7A68] mb-2">{book.author}</p>
        <p className="text-xs text-[#5C5C4F] leading-relaxed line-clamp-3 mb-2">
          {book.description}
        </p>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={book.rating} />
          <a href="#" className="text-xs text-[#C4622D] hover:underline">
            Review
          </a>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <Link
            to={`/books/${book.id}`}
            className="block overflow-hidden rounded-md w-14 aspect-[2/3] bg-[#F0EDE4]"
          >
            <img
              src={book.cover}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.src = `https://placehold.co/80x120/e8e4d9/8a8070?text=Book`;
              }}
            />
          </Link>
        </div>
        <div className="flex-1 text-right">
          <p className="font-bold text-[#1C1C1C] text-sm mb-2">
            ${book.price.toFixed(2)}
          </p>
          <button
            onClick={() => addItem(book)}
            className="w-full py-2 rounded-lg bg-[#2C3A1E] text-[#FAF9F5] text-sm font-medium hover:bg-[#1C2815] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [books, setBooks] = useState(localBooks);

  useEffect(() => {
    api
      .home()
      .then(({ featured }) => setBooks(featured))
      .catch(() => setBooks(localBooks));
  }, []);

  const featured = books.filter((b) => b.featured).slice(0, 4);
  const staffPicks = books.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[380px] sm:min-h-[440px] flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2C3A1E 0%, #4A5C34 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80')",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#FAF9F5] leading-tight mb-4">
              Find your next
              <br />
              great read
            </h1>
            <p className="text-[#D4CFC0] text-base mb-8 leading-relaxed">
              Explore our curated collection of diverse voices and timeless
              classics.
            </p>
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C4622D] text-white font-semibold rounded-lg hover:bg-[#A85226] transition-colors"
            >
              Browse Books
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Category pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/catalogue?cat=${encodeURIComponent(cat)}`}
              className="px-5 py-2 rounded-full border border-[#2C3A1E] text-[#2C3A1E] text-sm font-medium bg-transparent hover:bg-[#2C3A1E] hover:text-[#FAF9F5] transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured This Month */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-6">
          Featured This Month
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((book) => (
            <FeaturedBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Staff Picks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1C1C1C]">Staff Picks</h2>
          <div className="flex gap-2">
            <button
              className="w-8 h-8 rounded-full border border-[#D4CFC0] flex items-center justify-center text-[#5C5C4F] hover:border-[#2C3A1E] hover:text-[#2C3A1E] transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              className="w-8 h-8 rounded-full border border-[#D4CFC0] flex items-center justify-center text-[#5C5C4F] hover:border-[#2C3A1E] hover:text-[#2C3A1E] transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {staffPicks.map((book) => (
            <StaffPickCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#2C3A1E] py-14">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#FAF9F5] mb-2">
            Stay in the Know
          </h2>
          <p className="text-[#B0B898] text-sm mb-6">
            Subscribe to our newsletter for new releases, recommendations, and
            events.
          </p>
          <form
            className="flex gap-3 flex-col sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white text-[#1C1C1C] placeholder-[#9A9A85] text-sm border border-[#E8E4D9] focus:outline-none focus:ring-2 focus:ring-[#C4622D]"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#C4622D] text-white font-semibold rounded-lg hover:bg-[#A85226] transition-colors text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
