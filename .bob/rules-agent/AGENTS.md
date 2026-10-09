# Agent Mode Rules (Advance Coding Guidelines)

- **API Requests**: Never invoke raw `fetch` in components or pages; route all requests through exported methods in [`src/api.js`](src/api.js).
- **Auth Storage Key**: Token must be saved to and read from `localStorage` specifically under the key `"bookstore_token"`.
- **Hybrid Data Seeding**: Components fetching catalogue/book details initialize state synchronously with fallback mock records from [`src/data/books.js`](src/data/books.js), then asynchronously replace with remote data from `api.catalogue()` or `api.book(id)` to prevent layout shifts.
- **Form Validation**: Always pair `react-hook-form` with `yupResolver(schema)` using Yup schemas. Handle backend error responses by calling `setError("root", { message })` and rendering an alert banner bound to `errors.root`.
- **Icons**: Use inline SVG components from [`src/components/Icons.jsx`](src/components/Icons.jsx) rather than adding third-party icon libraries.
- **Unused Variables in Oxlint**: Prefix any intentionally unused arguments or variables with `_` to satisfy `.oxlintrc.json` rules.
- **Testing Isolated Components**: Tests must wrap rendered components in `<MemoryRouter>` and provide custom context mocks via `<AuthContext.Provider value={{ ... }}>` or `<CartProvider>`.
- **Fast Single Test Command**: Use `npx vitest run <path/to/test.jsx>` or `npx vitest run <path/to/test.jsx> -t "<test name>"`.
