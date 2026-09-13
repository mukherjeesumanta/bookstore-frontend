import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderSummary from "./index";

const items = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 34.99,
    quantity: 1,
    cover: "",
  },
  {
    id: "2",
    title: "Design Patterns",
    author: "Gang of Four",
    price: 44.99,
    quantity: 2,
    cover: "",
  },
];

describe("OrderSummary", () => {
  it("renders the Order Summary heading", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={0}
        shippingCost={0}
        tax={0}
        total={0}
      />,
    );
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("renders each item title", () => {
    render(
      <OrderSummary
        items={items}
        subtotal={124.97}
        shippingCost={5.99}
        tax={9.0}
        total={139.96}
      />,
    );
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Design Patterns")).toBeInTheDocument();
  });

  it("renders each item line price", () => {
    render(
      <OrderSummary
        items={items}
        subtotal={124.97}
        shippingCost={5.99}
        tax={9.0}
        total={139.96}
      />,
    );
    expect(screen.getByText("$34.99")).toBeInTheDocument();
    expect(screen.getByText("$89.98")).toBeInTheDocument();
  });

  it("renders subtotal, shipping and tax rows", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={20}
        shippingCost={5.99}
        tax={1.6}
        total={27.59}
      />,
    );
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Estimated Tax")).toBeInTheDocument();
  });

  it("renders correct subtotal value", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={20.0}
        shippingCost={5.99}
        tax={1.6}
        total={27.59}
      />,
    );
    expect(screen.getByText("$20.00")).toBeInTheDocument();
  });

  it("shows Free when shippingCost is 0", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={0}
        shippingCost={0}
        tax={0}
        total={0}
      />,
    );
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("renders total with label", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={20}
        shippingCost={5.99}
        tax={1.6}
        total={27.59}
      />,
    );
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("$27.59")).toBeInTheDocument();
  });

  it("shows qty badge for items with quantity > 1", () => {
    render(
      <OrderSummary
        items={items}
        subtotal={124.97}
        shippingCost={5.99}
        tax={9.0}
        total={139.96}
      />,
    );
    expect(screen.getByText("Qty: 2")).toBeInTheDocument();
  });

  it("shows overflow count when items exceed maxItems", () => {
    const manyItems = Array.from({ length: 7 }, (_, i) => ({
      id: String(i),
      title: `Book ${i}`,
      author: "Author",
      price: 10,
      quantity: 1,
      cover: "",
    }));
    render(
      <OrderSummary
        items={manyItems}
        maxItems={5}
        subtotal={70}
        shippingCost={0}
        tax={0}
        total={70}
      />,
    );
    expect(screen.getByText("+ 2 more item(s)")).toBeInTheDocument();
  });

  it("renders optional footer slot", () => {
    render(
      <OrderSummary
        items={[]}
        subtotal={0}
        shippingCost={0}
        tax={0}
        total={0}
        footer={<button>Checkout</button>}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Checkout" }),
    ).toBeInTheDocument();
  });
});
