import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Checkout from "./index";

function renderCheckout() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Checkout />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Checkout page", () => {
  it("renders the step indicator", () => {
    renderCheckout();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("renders Contact Information section", () => {
    renderCheckout();
    expect(screen.getByText("Contact Information")).toBeInTheDocument();
  });

  it("renders name field with pre-filled value", () => {
    renderCheckout();
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
  });

  it("renders email field with pre-filled value", () => {
    renderCheckout();
    expect(screen.getByDisplayValue("john.doe@email.com")).toBeInTheDocument();
  });

  it("renders Shipping Address section", () => {
    renderCheckout();
    expect(screen.getByText("Shipping Address")).toBeInTheDocument();
  });

  it("renders Delivery Method section", () => {
    renderCheckout();
    expect(screen.getByText("Delivery Method")).toBeInTheDocument();
  });

  it("renders Standard Shipping option", () => {
    renderCheckout();
    expect(screen.getByText("Standard Shipping")).toBeInTheDocument();
  });

  it("renders Express Shipping option", () => {
    renderCheckout();
    expect(screen.getByText("Express Shipping")).toBeInTheDocument();
  });

  it("renders Continue to Payment button", () => {
    renderCheckout();
    expect(
      screen.getByRole("button", { name: /continue to payment/i }),
    ).toBeInTheDocument();
  });

  it("renders Order Summary panel", () => {
    renderCheckout();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });
});
