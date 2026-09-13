import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Payment from "./index";

function renderPayment() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Payment />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Payment page", () => {
  it("renders Payment & Billing heading", () => {
    renderPayment();
    expect(screen.getByText(/payment & billing/i)).toBeInTheDocument();
  });

  it("renders checkout progress bar", () => {
    renderPayment();
    expect(screen.getByText("Checkout Progress")).toBeInTheDocument();
  });

  it("renders Choose Payment Method heading", () => {
    renderPayment();
    expect(screen.getByText("Choose Payment Method")).toBeInTheDocument();
  });

  it("renders Credit or Debit Card option", () => {
    renderPayment();
    expect(screen.getByText("Credit or Debit Card")).toBeInTheDocument();
  });

  it("renders PayPal option", () => {
    renderPayment();
    // "PayPal" is split across two spans: "Pay" + "Pal" — query the container label
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === "LABEL" &&
          el.textContent.toLowerCase().includes("paypal"),
      ),
    ).toBeInTheDocument();
  });

  it("renders card form fields by default", () => {
    renderPayment();
    expect(screen.getByPlaceholderText("Cardholder Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM/YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("3 digits")).toBeInTheDocument();
  });

  it("renders Place Order button", () => {
    renderPayment();
    expect(
      screen.getByRole("button", { name: /place order/i }),
    ).toBeInTheDocument();
  });

  it("renders lock security notice", () => {
    renderPayment();
    expect(
      screen.getByText(/all transactions are secured/i),
    ).toBeInTheDocument();
  });

  it("shows PayPal button when PayPal radio is selected", async () => {
    renderPayment();
    // Find label whose text content includes "paypal"
    const paypalLabel = screen.getByText(
      (_, el) =>
        el?.tagName === "LABEL" &&
        el.textContent.toLowerCase().includes("paypal"),
    );
    await userEvent.click(paypalLabel);
    expect(
      screen.getByRole("button", { name: /pay with paypal/i }),
    ).toBeInTheDocument();
  });

  it("renders Order Summary panel", () => {
    renderPayment();
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });
});
