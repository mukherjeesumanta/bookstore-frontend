import { describe, expect, it, vi, beforeEach } from "vitest";
import { api } from "./api";

describe("bookstore API client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("requests searchable catalogue data from the backend", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ books: [], pagination: { total: 0 } }),
    });

    await api.catalogue({ q: "clean code", category: "Programming" });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/catalogue?q=clean+code&category=Programming",
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("adds the JWT when requesting the protected profile API", async () => {
    localStorage.setItem("bookstore_token", "token");
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ user: {} }),
    });

    await api.profile();

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/profile",
      expect.objectContaining({
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
      }),
    );
  });
});
