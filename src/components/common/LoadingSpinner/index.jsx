/**
 * LoadingSpinner — animated SVG spinner.
 *
 * Props:
 *  size      — Tailwind size class applied to the svg (default "w-8 h-8")
 *  className — additional classes (e.g. "text-[#C4622D]" to tint)
 *  label     — accessible sr-only text (default "Loading…")
 */
export default function LoadingSpinner({
  size = "w-8 h-8",
  className = "text-[#C4622D]",
  label = "Loading…",
}) {
  return (
    <span role="status" aria-label={label} className={`inline-block ${className}`}>
      <svg
        className={`animate-spin ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}
