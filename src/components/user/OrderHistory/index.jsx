import "./OrderHistory.css";

/**
 * Renders a list of past orders.
 * Expects `orders` — array of { id, date, total, items: [{ id, title, author, price, quantity }] }
 */
export default function OrderHistory({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <div className="order-history-empty">
        <p>You have no previous orders yet.</p>
      </div>
    );
  }

  return (
    <section className="order-history" aria-label="Order history">
      <h2 className="order-history__heading">Previous Orders</h2>

      <div className="order-history__list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            {/* Order header */}
            <div className="order-card__header">
              <div>
                <span className="order-card__id">Order #{order.id}</span>
                <span className="order-card__date">{order.date}</span>
              </div>
              <span className="order-card__total">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Item list */}
            <ul className="order-card__items">
              {order.items.map((item) => (
                <li key={item.id} className="order-card__item">
                  <div className="order-card__item-info">
                    <span className="order-card__item-title">{item.title}</span>
                    <span className="order-card__item-author">
                      {item.author}
                    </span>
                  </div>
                  <div className="order-card__item-price">
                    <span className="order-card__item-qty">
                      ×{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
