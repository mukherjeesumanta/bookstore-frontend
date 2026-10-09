# Plan Mode Rules (Architectural Constraints)

- **Authentication Lifecycle**: Auth state in React context (`AuthContext`) relies on `localStorage.getItem("bookstore_token")`. API requests in `src/api.js` read the token directly from `localStorage` per request, while components read reactive auth state via `useAuth()`.
- **Cart State Isolation**: Cart state is managed exclusively in-memory via `useReducer` in `CartContext`. It does not automatically persist to backend or localStorage unless explicitly triggered.
- **Client Fallback vs Remote Data**: Features modifying catalogue or book browsing must maintain compatibility with both static fallback schema ([`src/data/books.js`](src/data/books.js)) and remote backend JSON payload structures.
- **Routing & Navigation**: Routing uses React Router DOM v7 (`<Routes>`, `<Route>`, `useNavigate`, `useSearchParams`, `useParams`). Navigation during authentication actions should use `{ replace: true }`.
- **Form State Contract**: Forms across Login, Checkout, and Payment enforce Yup schema validation with immediate visual feedback via error classes and accessible `role="alert"` error messages.
