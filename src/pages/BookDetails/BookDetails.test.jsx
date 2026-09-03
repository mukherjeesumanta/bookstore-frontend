import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import BookDetails from './index';

function renderPage(bookId = '1') {
  return render(
    <MemoryRouter initialEntries={[`/books/${bookId}`]}>
      <CartProvider>
        <Routes>
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('BookDetails page', () => {
  it('renders the book title', () => {
    renderPage('1');
    expect(screen.getByRole('heading', { level: 1, name: 'The Pragmatic Programmer' })).toBeInTheDocument();
  });

  it('renders the author name', () => {
    renderPage('1');
    expect(screen.getByText('David Thomas & Andrew Hunt')).toBeInTheDocument();
  });

  it('renders the price', () => {
    renderPage('1');
    expect(screen.getByText('$39.99')).toBeInTheDocument();
  });

  it('renders Add to Cart button', () => {
    renderPage('1');
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('renders quantity controls', () => {
    renderPage('1');
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
  });

  it('renders the breadcrumb with Catalogue link', () => {
    renderPage('1');
    expect(screen.getByRole('link', { name: 'Catalogue' })).toBeInTheDocument();
  });

  it('renders the You May Also Like section', () => {
    renderPage('1');
    expect(screen.getByText('You May Also Like')).toBeInTheDocument();
  });

  it('renders not-found state for unknown book id', () => {
    renderPage('999');
    expect(screen.getByText('Book not found')).toBeInTheDocument();
  });

  it('renders the Back to Catalogue link on not-found', () => {
    renderPage('999');
    expect(screen.getByRole('link', { name: /back to catalogue/i })).toBeInTheDocument();
  });
});
