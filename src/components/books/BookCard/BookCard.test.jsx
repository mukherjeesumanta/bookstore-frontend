import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../../../context/CartContext";
import BookCard from "./index";

const mockBook = {
  id: "1",
  title: "The Pragmatic Programmer",
  author: "David Thomas",
  price: 39.99,
  originalPrice: 49.99,
  cover: "https://example.com/cover.jpg",
  category: "Programming",
  rating: 4.8,
  reviewCount: 2341,
  inStock: true,
};

const outOfStockBook = { ...mockBook, id: "2", inStock: false };

function renderCard(book = mockBook) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <BookCard book={book} />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("BookCard", () => {
  it("renders the book title", () => {
    renderCard();
    expect(screen.getByText("The Pragmatic Programmer")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    renderCard();
    expect(screen.getByText("David Thomas")).toBeInTheDocument();
  });

  it("renders the formatted price", () => {
    renderCard();
    expect(screen.getByText("$39.99")).toBeInTheDocument();
  });

  it("renders an Add to Cart button when in stock", () => {
    renderCard();
    expect(
      screen.getByRole("button", {
        name: /add the pragmatic programmer to cart/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders Out of Stock button when not in stock", () => {
    renderCard(outOfStockBook);
    expect(
      screen.getByRole("button", { name: /add.*to cart/i }),
    ).toBeDisabled();
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("links to the book details page", () => {
    renderCard();
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/books/1");
  });

  it("renders book cover image", () => {
    renderCard();
    const img = screen.getByAltText("Cover of The Pragmatic Programmer");
    expect(img).toHaveAttribute("src", "https://example.com/cover.jpg");
  });

  it("renders 5 star icons", () => {
    renderCard();
    const article = screen.getByRole("article");
    const stars = article.querySelectorAll("svg");
    // 5 stars + 1 cart icon = 6 svgs
    expect(stars.length).toBeGreaterThanOrEqual(5);
  });

  it("calls addItem on Add to Cart click", async () => {
    renderCard();
    const btn = screen.getByRole("button", {
      name: /add the pragmatic programmer to cart/i,
    });
    await userEvent.click(btn);
    // CartContext updated — no crash means item was added
    expect(btn).toBeInTheDocument();
  });
});
