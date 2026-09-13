# Leaf & Letter — Online Bookstore Frontend

A React single-page application for browsing, searching, and purchasing books online. Built with Vite, Tailwind CSS v4, and React Router v7.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Testing](#testing)

---

## Features

- **Book catalogue** — browse all books, filter by category, search by title or author
- **Book details** — dedicated page per book with full description and add-to-cart action
- **Shopping cart** — add/remove items, adjust quantities, persistent within session
- **Checkout & Payment** — multi-step checkout flow (shipping → payment → confirmation)
- **User registration & login** — form with client-side validation via react-hook-form + Yup; auth state held in React context
- **JWT authentication** — token stored in `localStorage`; automatically attached to API requests
- **User profile** — displays name, username, and full order history fetched from the backend
- **Order history** — past orders listed on the profile page with itemised breakdown
- **Responsive navbar** — collapses to a hamburger menu on mobile; shows a login link or user avatar depending on auth state

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Form handling | react-hook-form 7 |
| Form validation | Yup 1 + `@hookform/resolvers` |
| HTTP client | `fetch` (native) via `src/api.js` |
| Linting | Oxlint |
| Testing | Vitest 5 + Testing Library |

---

## Project Structure

```
src/
├── assets/                  # Static images and icons
├── components/
│   ├── books/
│   │   ├── BookCard/        # Individual book tile
│   │   ├── BookGrid/        # Responsive grid of BookCards
│   │   ├── CategoryFilter/  # Category pill buttons
│   │   └── SearchBar/       # Debounced search input
│   ├── cart/
│   │   ├── CartItem/        # Single cart line item
│   │   └── OrderSummary/    # Price breakdown panel
│   ├── common/
│   │   ├── Button/          # Reusable button
│   │   ├── InputField/      # Labelled input wrapper
│   │   └── LoadingSpinner/  # Animated spinner
│   ├── layout/
│   │   ├── Navbar/          # Sticky top navigation (auth-aware)
│   │   └── Footer/          # Site footer
│   ├── user/
│   │   ├── avatar/
│   │   │   └── UserAvatar/  # Clickable avatar → navigates to /profile
│   │   └── OrderHistory/    # Past orders list used on profile page
│   └── Icons.jsx            # SVG icon components
├── context/
│   ├── AuthContext.jsx      # Authentication state (login / logout / user)
│   └── CartContext.jsx      # Cart state (add / remove / update quantity)
├── data/
│   └── books.js             # Static book catalogue data (fallback)
├── pages/
│   ├── Home/                # Landing page with hero and featured books
│   ├── Catalogue/           # Searchable, filterable book grid
│   ├── BookDetails/         # Single-book detail view
│   ├── Cart/                # Cart page
│   ├── Checkout/            # Shipping address form
│   ├── Payment/             # Payment details form
│   ├── OrderConfirmation/   # Post-purchase confirmation
│   ├── Login/               # Login form (react-hook-form + Yup)
│   └── Profile/             # User profile + order history
├── test/
│   └── setup.js             # Testing Library jest-dom setup
├── api.js                   # Centralised fetch wrapper (reads VITE_API_URL)
├── App.jsx                  # Route definitions
├── main.jsx                 # App entry point — wraps with providers
└── index.css                # Tailwind base import
```

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- The [backend](../bookstore-backend/README.md) running on `http://localhost:4000` (required for login, catalogue, and orders)

### Installation

```bash
# From the bookstore-frontend directory
npm install
```

### Running the development server

```bash
npm run dev
```

The app starts at `http://localhost:5173` by default (Vite HMR enabled).

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serves the dist/ build locally
```

---

## Environment Variables

Create a `.env.local` file in `bookstore-frontend/` to override defaults:

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:4000/api` | Base URL of the backend API |

Example:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run Oxlint across all source files |
| `npm test` | Run all tests once (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests and generate a V8 coverage report |

---

## Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `Home` | Landing page with featured books |
| `/catalogue` | `Catalogue` | All books, searchable + filterable |
| `/books/:id` | `BookDetails` | Individual book detail |
| `/cart` | `Cart` | Shopping cart |
| `/checkout` | `Checkout` | Shipping address form |
| `/payment` | `Payment` | Payment details form |
| `/order-confirmation` | `OrderConfirmation` | Post-purchase receipt |
| `/login` | `Login` | Login / registration form |
| `/profile` | `Profile` | User profile — redirects to `/login` if not authenticated |

---

## Authentication

Auth state is managed by [`AuthContext`](src/context/AuthContext.jsx). The JWT returned by the backend is stored in `localStorage` under the key `bookstore_token` and is automatically included in every API request made through [`api.js`](src/api.js).

**Login flow:**
1. Fill in the form at `/login` — validated with Yup before submission.
2. On success the JWT and user object are stored; the user is redirected to `/`.
3. The Navbar switches to show the `<UserAvatar>` button.
4. Clicking the avatar navigates to `/profile`, where name, username, and previous orders are shown.
5. Clicking **Logout** clears the token and session, then redirects to `/`.

> **Note:** Auth state does not survive a page refresh unless a valid token is present in `localStorage`. On load, `AuthContext` checks for a stored token and re-hydrates state automatically.

---

## API Integration

All HTTP calls go through [`src/api.js`](src/api.js), which prepends `VITE_API_URL` and attaches the `Authorization: Bearer <token>` header when a token is present.

| Helper | Method | Backend endpoint |
|---|---|---|
| `api.home()` | GET | `/api/` |
| `api.catalogue(params)` | GET | `/api/catalogue` |
| `api.book(id)` | GET | `/api/books/:id` |
| `api.login(credentials)` | POST | `/api/login` |
| `api.checkout(payload)` | POST | `/api/checkout` |
| `api.payment(payload)` | POST | `/api/payment` |
| `api.profile()` | GET | `/api/profile` |

---

## Testing

Tests are colocated with their components (`ComponentName.test.jsx`). The suite uses **Vitest** as the test runner and **Testing Library** for DOM assertions.

```bash
npm test                 # run all tests once
npm run test:watch       # re-run on file changes
npm run test:coverage    # coverage report in coverage/
```

Key test suites:

| Suite | Tests | Coverage |
|---|---|---|
| `Navbar` | 15 | auth-state variants (logged in / logged out), mobile menu, links |
| `Login` | 8 | field validation, submission, error handling, navigation |
| `UserAvatar` | 4 | render, click navigation |
| `OrderHistory` | 6 | empty state, populated list, item details |
| Book, Cart, Checkout, Payment, Profile | per-component | full render and interaction coverage |
