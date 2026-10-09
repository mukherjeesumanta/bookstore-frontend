# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Commands
- **Run single test file**: `npx vitest run src/api.test.js` or `npm test -- src/pages/Login/Login.test.jsx`
- **Run single test by name**: `npx vitest run src/api.test.js -t "adds the JWT"`
- **Run all tests**: `npm test` (Vitest with jsdom environment)
- **Watch tests**: `npm run test:watch`
- **Lint**: `npm run lint` (Oxlint with React & unused variable rules)
- **Dev / Build**: `npm run dev` / `npm run build`

## Code Style & Conventions
- **API Client**: Always use centralized helper methods in [`src/api.js`](src/api.js) rather than calling `fetch` directly. Base URL reads `VITE_API_URL` (defaults to `http://localhost:4000/api`).
- **Auth Token**: Stored in `localStorage` under key `"bookstore_token"`. `src/api.js` automatically attaches `Authorization: Bearer <token>` when present.
- **State Management**: Use [`useAuth()`](src/context/AuthContext.jsx:32) and [`useCart()`](src/context/CartContext.jsx:62); both throw errors if accessed outside their provider wrappers.
- **Data Fallbacks**: Catalogue and book pages initialize state with static fallback data from [`src/data/books.js`](src/data/books.js) before hydrating via `api.catalogue()` or `api.book(id)`.
- **Form Handling**: Use `react-hook-form` paired with Yup schemas via `@hookform/resolvers/yup`. Set server-side/root submission errors using `setError("root", { message })`.
- **Icons**: Use minimal inline SVG icon components defined in [`src/components/Icons.jsx`](src/components/Icons.jsx); do not import external icon packages.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (imported via `@import "tailwindcss";` in `src/index.css`).
- **Linter Rules**: Oxlint ignores unused variables and arguments only when prefixed with `_` (`argsIgnorePattern: "^_"`, `varsIgnorePattern: "^_"`).
- **Component Organization**: Components and pages follow folder-based naming with `index.jsx` and colocated `<Name>.test.jsx` files.
- **Testing Pattern**: Wrap component tests with `<MemoryRouter>` and necessary context providers (`AuthContext.Provider`, `CartProvider`). Mock fetch globally with `vi.spyOn(globalThis, "fetch")`.
