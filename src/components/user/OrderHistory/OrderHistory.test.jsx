import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderHistory from "./index";

const SAMPLE_ORDERS = [
  {
    id: "LL001",
    date: "March 12, 2024",
    total: 34.98,
    items: [
      {
        id: 1,
        title: "The Hidden Forest",
        author: "Elara Vance",
        price: 24.99,
        quantity: 1,
      },
      {
        id: 2,
        title: "Wuthering Heights",
        author: "Emily Brontë",
        price: 9.99,
        quantity: 1,
      },
    ],
  },
];

describe("OrderHistory", () => {
  it("renders an empty-state message when orders array is empty", () => {
    render(<OrderHistory orders={[]} />);
    expect(screen.getByText(/no previous orders/i)).toBeInTheDocument();
  });

  it("renders the order ID and date", () => {
    render(<OrderHistory orders={SAMPLE_ORDERS} />);
    expect(screen.getByText(/LL001/)).toBeInTheDocument();
    expect(screen.getByText("March 12, 2024")).toBeInTheDocument();
  });

  it("renders formatted order total", () => {
    render(<OrderHistory orders={SAMPLE_ORDERS} />);
    expect(screen.getByText("$34.98")).toBeInTheDocument();
  });

  it("renders all item titles", () => {
    render(<OrderHistory orders={SAMPLE_ORDERS} />);
    expect(screen.getByText("The Hidden Forest")).toBeInTheDocument();
    expect(screen.getByText("Wuthering Heights")).toBeInTheDocument();
  });

  it("renders item authors", () => {
    render(<OrderHistory orders={SAMPLE_ORDERS} />);
    expect(screen.getByText("Elara Vance")).toBeInTheDocument();
  });

  it("renders multiple orders", () => {
    const twoOrders = [
      ...SAMPLE_ORDERS,
      {
        id: "LL002",
        date: "April 5, 2024",
        total: 14.99,
        items: [
          {
            id: 3,
            title: "Dune",
            author: "Frank Herbert",
            price: 14.99,
            quantity: 1,
          },
        ],
      },
    ];
    render(<OrderHistory orders={twoOrders} />);
    expect(screen.getByText(/LL001/)).toBeInTheDocument();
    expect(screen.getByText(/LL002/)).toBeInTheDocument();
  });
});
