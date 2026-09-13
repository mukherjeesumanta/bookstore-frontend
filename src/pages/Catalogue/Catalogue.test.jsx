import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import Catalogue from "./index";

function renderCatalogue(path = "/catalogue") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <Catalogue />
      </CartProvider>
    </MemoryRouter>,
  );
}

describe("Catalogue page", () => {
  it("renders the page heading", () => {
    renderCatalogue();
    expect(screen.getByText("Browse our catalogue")).toBeInTheDocument();
  });

  it("renders search input", () => {
    renderCatalogue();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    renderCatalogue();
    // 'All' only appears in top bar; 'Fiction' appears in top bar and sidebar
    expect(
      screen.getAllByRole("button", { name: "All" }).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getAllByRole("button", { name: "Fiction" }).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it("renders sort by select", () => {
    renderCatalogue();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders book cards from data", () => {
    renderCatalogue();
    // At least one book article should be present
    expect(screen.getAllByRole("article").length).toBeGreaterThan(0);
  });

  it("filters books when searching", async () => {
    renderCatalogue();
    const input = screen.getByPlaceholderText("Search");
    await userEvent.type(input, "Clean Code");
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
  });

  it("shows no books message when search yields nothing", async () => {
    renderCatalogue();
    const input = screen.getByPlaceholderText("Search");
    await userEvent.type(input, "xyznonexistent12345");
    expect(screen.getByText("No books found")).toBeInTheDocument();
  });

  it("shows result count text", () => {
    renderCatalogue();
    expect(screen.getByText(/showing/i)).toBeInTheDocument();
  });
});
