const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("bookstore_token");
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!response.ok)
    throw new Error((await response.json()).error || "Request failed");
  return response.json();
}

export const api = {
  home: () => request("/"),
  catalogue: (params = {}) =>
    request(`/catalogue?${new URLSearchParams(params)}`),
  book: (id) => request(`/books/${id}`),
  cart: () => request("/cart"),
  updateCart: (items) =>
    request("/cart", { method: "PUT", body: JSON.stringify({ items }) }),
  checkout: (payload) =>
    request("/checkout", { method: "POST", body: JSON.stringify(payload) }),
  login: (credentials) =>
    request("/login", { method: "POST", body: JSON.stringify(credentials) }),
  profile: () => request("/profile"),
  payment: (payload) =>
    request("/payment", { method: "POST", body: JSON.stringify(payload) }),
};

export default api;
