export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4622D] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#C4622D] text-white hover:bg-[#A85226] active:bg-[#8C4420]",
    secondary: "bg-white text-[#1C1C1C] border border-[#D4CFC0] hover:bg-[#F0EDE4] active:bg-[#E8E4D9]",
    dark: "bg-[#2C3A1E] text-[#FAF9F5] hover:bg-[#1C2815] active:bg-[#121C0D]",
    ghost: "text-[#C4622D] hover:bg-[#FFF5EF] active:bg-[#FFE8DA]",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  const sizes = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3",
    xl: "text-base px-8 py-4",
  };

  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
