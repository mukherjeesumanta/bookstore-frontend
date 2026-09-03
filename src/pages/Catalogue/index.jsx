import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { books, categories } from "../../data/books";
import { useCart } from "../../context/CartContext";
import { StarIcon, ShoppingCartIcon, MagnifyingGlassIcon } from "../../components/Icons";

const SORT_OPTIONS = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Highest Rated"];
const FILTER_CATEGORIES = ["All", "Fiction", "Mystery", "Sci-Fi", "History", "Romance", "Biography", ...categories];
const UNIQUE_CATS = [...new Set(FILTER_CATEGORIES)];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5 text-amber-500" filled={i < Math.floor(rating)} />
      ))}
    </div>
  );
}

function ChevronDown({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E8E4D9] pb-4 mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-sm font-semibold text-[#1C1C1C] mb-2"
      >
        {title}
        <ChevronDown className={`w-4 h-4 text-[#7A7A68] transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function BookCard({ book }) {
  const { addItem } = useCart();
  return (
    <article className="bg-white rounded-xl border border-[#E8E4D9] overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <a href={`/books/${book.id}`} className="block bg-[#F0EDE4] aspect-[3/4] overflow-hidden">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/e8e4d9/8a8070?text=${encodeURIComponent(book.title)}`;
          }}
        />
      </a>
      <div className="p-3 flex flex-col flex-1">
        <a href={`/books/${book.id}`}>
          <h3 className="font-semibold text-[#1C1C1C] text-sm leading-snug mb-0.5 hover:text-[#C4622D] transition-colors line-clamp-2">
            {book.title}
          </h3>
        </a>
        <p className="text-xs text-[#7A7A68] mb-2">{book.author}</p>
        <div className="flex items-center gap-1 mb-1">
          <StarRating rating={book.rating} />
          <span className="text-xs text-[#7A7A68]">({book.reviewCount > 99 ? "124" : book.reviewCount})</span>
        </div>
        <p className="text-sm font-bold text-[#1C1C1C] mb-3">${book.price.toFixed(2)}</p>
        <button
          onClick={() => addItem(book)}
          disabled={!book.inStock}
          className="mt-auto flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A85226] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add to Cart
          <ShoppingCartIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
}

export default function Catalogue() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("cat") || "All");
  const [sort, setSort] = useState("Featured");

  const filtered = useMemo(() => {
    let result = [...books];
    if (selectedCat !== "All") {
      result = result.filter((b) =>
        b.category.toLowerCase().includes(selectedCat.toLowerCase()) ||
        b.tags?.some((t) => t.toLowerCase().includes(selectedCat.toLowerCase()))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }
    if (sort === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sort === "Highest Rated") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [selectedCat, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-6">Browse our catalogue</h1>

        {/* Search bar */}
        <div className="relative mb-6 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A85]" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#E8E4D9] text-sm text-[#1C1C1C] placeholder-[#9A9A85] focus:outline-none focus:ring-2 focus:ring-[#C4622D]"
          />
        </div>

        {/* Filter chips + sort */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-[#7A7A68] mr-2">
              Showing 1–{filtered.length} of {filtered.length} titles
            </span>
            {["All", "Fiction", "Mystery", "Sci-Fi", "History", "Romance", "Biography"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  selectedCat === cat
                    ? "bg-[#2C3A1E] text-[#FAF9F5] border-[#2C3A1E]"
                    : "bg-white text-[#1C1C1C] border-[#C8C4B8] hover:border-[#2C3A1E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#7A7A68]">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-[#E8E4D9] bg-white text-sm text-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-[#C4622D]"
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <p className="text-sm font-semibold text-[#7A7A68] mb-4">Optional Filter</p>

          <FilterSection title="Titles">
            <ul className="space-y-1.5 text-sm text-[#5C5C4F]">
              <li><button className="hover:text-[#C4622D]">Titles</button></li>
              <li><button className="hover:text-[#C4622D]">Genres</button></li>
            </ul>
          </FilterSection>

          <FilterSection title="Genres">
            <ul className="space-y-1.5 text-sm text-[#5C5C4F]">
              {["Mystery", "History", "Romance"].map((g) => (
                <li key={g}>
                  <button
                    onClick={() => setSelectedCat(g)}
                    className={`hover:text-[#C4622D] transition-colors ${selectedCat === g ? "text-[#C4622D] font-medium" : ""}`}
                  >
                    {g}
                  </button>
                </li>
              ))}
            </ul>
          </FilterSection>

          <FilterSection title="Price Range" defaultOpen={false}>
            <div className="flex gap-2 items-center text-sm text-[#5C5C4F]">
              <input type="number" placeholder="Min" className="w-20 px-2 py-1 rounded border border-[#E8E4D9] text-xs focus:outline-none" />
              <span>–</span>
              <input type="number" placeholder="Max" className="w-20 px-2 py-1 rounded border border-[#E8E4D9] text-xs focus:outline-none" />
            </div>
          </FilterSection>

          <FilterSection title="Authors">
            <ul className="space-y-1.5 text-sm text-[#5C5C4F]">
              {["Fiction", "Mystery", "Sci-Fi", "History Raller", "Romance"].map((a) => (
                <li key={a}><button className="hover:text-[#C4622D]">{a}</button></li>
              ))}
            </ul>
          </FilterSection>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#7A7A68]">
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-1 mt-10">
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#5C5C4F] hover:bg-[#E8E4D9] transition-colors">‹</button>
            {[1, 2, 3, 4].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  p === 1 ? "bg-[#C4622D] text-white" : "text-[#5C5C4F] hover:bg-[#E8E4D9]"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="px-1 text-[#5C5C4F]">…</span>
            <button className="px-3 h-8 flex items-center gap-1 text-sm text-[#5C5C4F] hover:bg-[#E8E4D9] rounded-full transition-colors">
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
