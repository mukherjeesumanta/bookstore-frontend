/**
 * InputField — labelled input / select / textarea with optional error state.
 *
 * Props:
 *  label       — string, shown above the field
 *  id          — string, links label to input (defaults to name)
 *  name        — string
 *  type        — "text" | "email" | "password" | "number" | "search" | "tel" (default "text")
 *  as          — "input" | "select" | "textarea" (default "input")
 *  error       — string, shown below in red when set
 *  className   — extra classes forwarded to the wrapper div
 *  inputClass  — extra classes forwarded to the input element
 *  children    — forwarded to <select> as <option> elements
 *  ...rest     — all other props forwarded to the input element
 */
export default function InputField({
  label,
  id,
  name,
  type = "text",
  as = "input",
  error,
  className = "",
  inputClass = "",
  children,
  ...rest
}) {
  const fieldId = id ?? name;

  const base =
    "w-full px-3 py-2.5 rounded-lg border text-sm text-[#1C1C1C] placeholder-[#9A9A85] " +
    "focus:outline-none focus:ring-2 focus:ring-[#C4622D] transition-colors bg-white";

  const stateClass = error
    ? "border-[#C4622D] bg-[#FFF8F5]"
    : "border-[#E8E4D9]";

  const fieldClass = `${base} ${stateClass} ${inputClass}`;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="block text-xs font-medium text-[#5C5C4F] mb-1.5">
          {label}
        </label>
      )}

      {as === "select" ? (
        <select id={fieldId} name={name} className={fieldClass} {...rest}>
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea id={fieldId} name={name} className={`${fieldClass} resize-y`} {...rest} />
      ) : (
        <input id={fieldId} name={name} type={type} className={fieldClass} {...rest} />
      )}

      {error && (
        <p className="mt-1 text-xs text-[#C4622D]">{error}</p>
      )}
    </div>
  );
}
