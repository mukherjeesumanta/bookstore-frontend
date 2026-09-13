import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./index";

describe("LoadingSpinner", () => {
  it("renders with default accessible label", () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders the sr-only label text", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading…")).toBeInTheDocument();
  });

  it("uses custom label text", () => {
    render(<LoadingSpinner label="Please wait" />);
    expect(
      screen.getByRole("status", { name: "Please wait" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });

  it("applies custom size class to the svg", () => {
    render(<LoadingSpinner size="w-12 h-12" />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("w-12");
    expect(svg).toHaveClass("h-12");
  });

  it("applies animate-spin class to svg", () => {
    render(<LoadingSpinner />);
    const svg = screen.getByRole("status").querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
  });

  it("applies custom className to the wrapper span", () => {
    render(<LoadingSpinner className="text-blue-500" />);
    expect(screen.getByRole("status")).toHaveClass("text-blue-500");
  });
});
