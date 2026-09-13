import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Home from "./index";

function renderHome() {
  return render(
    <MemoryRouter>
      <CartProvider>
        <Home />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Home page", () => {
  it("renders the hero headline", () => {
    renderHome();
    expect(screen.getByText(/find your next/i)).toBeInTheDocument();
  });

  it("renders Browse Books CTA", () => {
    renderHome();
    expect(
      screen.getByRole("link", { name: /browse books/i }),
    ).toBeInTheDocument();
  });

  it("Browse Books CTA links to /catalogue", () => {
    renderHome();
    expect(screen.getByRole("link", { name: /browse books/i })).toHaveAttribute(
      "href",
      "/catalogue",
    );
  });

  it("renders the Featured This Month section", () => {
    renderHome();
    expect(screen.getByText("Featured This Month")).toBeInTheDocument();
  });

  it("renders the Staff Picks section", () => {
    renderHome();
    expect(screen.getByText("Staff Picks")).toBeInTheDocument();
  });

  it("renders category pills", () => {
    renderHome();
    expect(screen.getByRole("link", { name: "Fiction" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mystery" })).toBeInTheDocument();
  });

  it("renders newsletter section", () => {
    renderHome();
    expect(screen.getByText("Stay in the Know")).toBeInTheDocument();
  });

  it("renders newsletter email input", () => {
    renderHome();
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
  });

  it("renders Subscribe button", () => {
    renderHome();
    expect(
      screen.getByRole("button", { name: /subscribe/i }),
    ).toBeInTheDocument();
  });
});
