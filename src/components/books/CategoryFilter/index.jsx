/**
 * CategoryFilter — a row of pill-shaped category toggle buttons.
 *
 * Props:
 *  categories    — string[] of category names
 *  selected      — currently active category string
 *  onSelect      — (category: string) => void
 *  className     — extra wrapper classes
 */
export default function CategoryFilter({
  categories = [],
  selected,
  onSelect,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === cat
              ? "bg-[#2C3A1E] text-[#FAF9F5] border-[#2C3A1E]"
              : "bg-white text-[#1C1C1C] border-[#C8C4B8] hover:border-[#2C3A1E]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
