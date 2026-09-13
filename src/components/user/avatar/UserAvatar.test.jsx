import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import UserAvatar from "./UserAvatar";

// Re-export AuthContext so the test can provide its own value
// (AuthContext itself is not exported by default — we patch via vi.mock)

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderWithAuth(user) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{ user, isLoggedIn: !!user, login: vi.fn(), logout: vi.fn() }}
      >
        <UserAvatar />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe("UserAvatar", () => {
  beforeEach(() => mockNavigate.mockClear());

  it("renders the first letter of the user name", () => {
    renderWithAuth({ name: "Alex Reader", username: "alexreader", orders: [] });
    expect(
      screen.getByRole("button", { name: /go to profile/i }),
    ).toHaveTextContent("A");
  });

  it("renders '?' when no user is provided", () => {
    renderWithAuth(null);
    expect(
      screen.getByRole("button", { name: /go to profile/i }),
    ).toHaveTextContent("?");
  });

  it("navigates to /profile when clicked", async () => {
    renderWithAuth({ name: "Bob", username: "bob", orders: [] });
    await userEvent.click(
      screen.getByRole("button", { name: /go to profile/i }),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });

  it("uses uppercase initial regardless of input case", () => {
    renderWithAuth({ name: "zara", username: "zara", orders: [] });
    expect(screen.getByRole("button")).toHaveTextContent("Z");
  });
});
