import { MagnifyingGlassIcon } from "../../Icons";

/**
 * SearchBar — controlled search input with a magnifying-glass icon.
 *
 * Props:
 *  value       — string (controlled value)
 *  onChange    — (e) => void
 *  placeholder — string (default "Search…")
 *  className   — extra wrapper classes
 */
export default function SearchBar({
  value,
  onChange,
  placeholder = "Search…",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A85] pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#E8E4D9] text-sm text-[#1C1C1C] placeholder-[#9A9A85] focus:outline-none focus:ring-2 focus:ring-[#C4622D]"
      />
    </div>
  );
}
