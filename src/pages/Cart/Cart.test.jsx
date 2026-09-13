import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider, useCart } from "../../context/CartContext";
import { books } from "../../data/books";
import Cart from "./index";

function renderEmpty() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </MemoryRouter>,
  );
}

// Wrapper that pre-loads one book into the cart
function CartWithItem({ children }) {
  return (
    <MemoryRouter>
      <CartProvider>
        <_Loader book={books[0]}>{children}</_Loader>
      </CartProvider>
    </MemoryRouter>
  );
}

function _Loader({ book, children }) {
  const { addItem } = useCart();
  // synchronously add on first render via a side-effect-free trick:
  // We render the children and a hidden button to add
  return (
    <>
      <button
        data-testid="add-trigger"
        onClick={() => addItem(book)}
        style={{ display: "none" }}
      />
      {children}
    </>
  );
}

async function renderWithItem() {
  const utils = render(
    <MemoryRouter>
      <CartProvider>
        <_Loader book={books[0]}>
          <Cart />
        </_Loader>
      </CartProvider>
    </MemoryRouter>,
  );
  await userEvent.click(utils.getByTestId("add-trigger"));
  return utils;
}

describe("Cart page", () => {
  it("renders empty cart state", () => {
    renderEmpty();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it("renders Browse Books link when empty", () => {
    renderEmpty();
    expect(
      screen.getByRole("link", { name: /browse books/i }),
    ).toBeInTheDocument();
  });

  it("renders cart heading when items present", async () => {
    await renderWithItem();
    expect(screen.getByText("Your Shopping Cart")).toBeInTheDocument();
  });

  it("renders book title in cart when items present", async () => {
    await renderWithItem();
    expect(screen.getByText("The Pragmatic Programmer")).toBeInTheDocument();
  });

  it("renders Order Summary panel", async () => {
    await renderWithItem();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("renders Proceed to Checkout button", async () => {
    await renderWithItem();
    expect(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    ).toBeInTheDocument();
  });

  it("renders Continue Shopping link", async () => {
    await renderWithItem();
    expect(
      screen.getByRole("link", { name: /continue shopping/i }),
    ).toBeInTheDocument();
  });

  it("renders promo code input", async () => {
    await renderWithItem();
    expect(
      screen.getByPlaceholderText(/add discount code/i),
    ).toBeInTheDocument();
  });
});
