# Ask Mode Rules (Documentation & Context)

- **Backend Dependency**: Backend runs on `http://localhost:4000/api` by default (`VITE_API_URL`). When the backend is offline, the frontend falls back gracefully to static mock data in [`src/data/books.js`](src/data/books.js) for catalogue views.
- **Component & Page Structure**: Components and pages are organized in folders named after the component with an `index.jsx` entry file and colocated `<ComponentName>.test.jsx` unit test.
- **Icon Source of Truth**: All application icons are hand-crafted SVG functional components defined in [`src/components/Icons.jsx`](src/components/Icons.jsx).
- **Global Context Providers**: Root layout wraps the app in [`AuthProvider`](src/context/AuthContext.jsx:6) and [`CartProvider`](src/context/CartContext.jsx:33) inside `<BrowserRouter>` in [`src/main.jsx`](src/main.jsx:9).
- **CSS Setup**: The project uses Tailwind CSS v4 via `@tailwindcss/vite` plugin with `@import "tailwindcss";` in [`src/index.css`](src/index.css:1), rather than a legacy `tailwind.config.js`.
