/**
 * OrderSummary — reusable sidebar panel showing cart items and price breakdown.
 *
 * Props:
 *  items         — array of cart item objects { id, title, author, cover, price, quantity }
 *  subtotal      — number
 *  shippingCost  — number
 *  tax           — number
 *  total         — number
 *  shippingLabel — string shown next to shipping amount (default "Standard")
 *  maxItems      — max items to show before truncating (default 5)
 *  footer        — optional ReactNode rendered at the bottom of the panel
 */
export default function OrderSummary({
  items = [],
  subtotal = 0,
  shippingCost = 0,
  tax = 0,
  total = 0,
  shippingLabel = "Standard",
  maxItems = 5,
  footer,
}) {
  const visibleItems = items.slice(0, maxItems);

  return (
    <div className="bg-white rounded-xl border border-[#E8E4D9] p-5">
      <h2 className="text-base font-bold text-[#1C1C1C] mb-4">Order Summary</h2>

      {/* Item list */}
      {visibleItems.length > 0 && (
        <div className="space-y-3 mb-4">
          {visibleItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="w-10 h-12 rounded overflow-hidden bg-[#F0EDE4] flex-shrink-0">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/40x48/e8e4d9/8a8070?text=B";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#1C1C1C] truncate">{item.title}</p>
                <p className="text-xs text-[#7A7A68] truncate">{item.author}</p>
                {item.quantity > 1 && (
                  <p className="text-xs text-[#9A9A85]">Qty: {item.quantity}</p>
                )}
              </div>
              <span className="text-xs font-medium text-[#1C1C1C] flex-shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          {items.length > maxItems && (
            <p className="text-xs text-[#7A7A68]">+ {items.length - maxItems} more item(s)</p>
          )}
        </div>
      )}

      {/* Price breakdown */}
      <div className="border-t border-[#E8E4D9] pt-3 space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-[#5C5C4F]">Subtotal</span>
          <span className="font-medium text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5C5C4F]">Shipping</span>
          <span className="font-medium text-[#1C1C1C]">
            {shippingCost === 0 ? "Free" : `${shippingLabel} - $${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[#5C5C4F]">Estimated Tax</span>
          <span className="font-medium text-[#1C1C1C]">${tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-[#2C3A1E] pt-3 flex justify-between mb-4">
        <span className="font-bold text-[#1C1C1C] text-base">Total</span>
        <span className="font-bold text-[#C4622D] text-base">${total.toFixed(2)}</span>
      </div>

      {/* Optional footer slot */}
      {footer}
    </div>
  );
}
