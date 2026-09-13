import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Login from "./index";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderLogin({ login = vi.fn(), isLoggedIn = false } = {}) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{ user: null, isLoggedIn, login, logout: vi.fn() }}
      >
        <Login />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe("Login page", () => {
  it("renders username and password fields", () => {
    renderLogin();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    renderLogin();
    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("shows validation error when username is too short", async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText(/username/i), "ab");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument(),
    );
  });

  it("shows validation error when password is too short", async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText(/username/i), "validuser");
    await userEvent.type(screen.getByLabelText(/password/i), "123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument(),
    );
  });

  it("shows a validation error for username when fields are empty", async () => {
    renderLogin();
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    // yup trims empty string first, so min(3) fires before required
    await waitFor(() =>
      expect(
        screen.getByText(
          /username must be at least 3 characters|username is required/i,
        ),
      ).toBeInTheDocument(),
    );
  });

  it("calls login with correct credentials", async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    renderLogin({ login: mockLogin });

    await userEvent.type(screen.getByLabelText(/username/i), "alexreader");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        username: "alexreader",
        password: "password123",
      }),
    );
  });

  it("navigates to / (home) on successful login", async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: true });
    renderLogin({ login: mockLogin });

    await userEvent.type(screen.getByLabelText(/username/i), "alexreader");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true }),
    );
  });

  it("shows error banner on failed login", async () => {
    const mockLogin = vi
      .fn()
      .mockResolvedValue({ success: false, message: "Invalid credentials." });
    renderLogin({ login: mockLogin });

    await userEvent.type(screen.getByLabelText(/username/i), "alexreader");
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        /invalid credentials/i,
      ),
    );
  });
});
