import BookCard from "../BookCard";

/**
 * BookGrid — renders a responsive grid of BookCard components.
 *
 * Props:
 *  books       — array of book objects
 *  emptyText   — message shown when books is empty (default "No books found")
 *  columns     — Tailwind grid-cols classes override
 *                (default "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4")
 */
export default function BookGrid({
  books = [],
  emptyText = "No books found",
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
}) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20 text-[#7A7A68]">
        <p className="text-lg font-medium">{emptyText}</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-4 sm:gap-5`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
