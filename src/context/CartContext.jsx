import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.book.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.book.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...state, { ...action.book, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.id);
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return state.filter((i) => i.id !== action.id);
      }
      return state.map((i) =>
        i.id === action.id ? { ...i, quantity: action.quantity } : i,
      );
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (book) => dispatch({ type: "ADD_ITEM", book });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", id });
  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
