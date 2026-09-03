import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../../context/CartContext';
import BookGrid from './index';

const books = [
  { id: '1', title: 'Book One', author: 'Author A', price: 10, originalPrice: 12, cover: '', category: 'Fiction', rating: 4, reviewCount: 10, inStock: true },
  { id: '2', title: 'Book Two', author: 'Author B', price: 15, originalPrice: 18, cover: '', category: 'Science', rating: 3, reviewCount: 5, inStock: true },
];

function renderGrid(props = {}) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <BookGrid books={books} {...props} />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('BookGrid', () => {
  it('renders a card for each book', () => {
    renderGrid();
    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
  });

  it('shows empty state when books array is empty', () => {
    renderGrid({ books: [] });
    expect(screen.getByText('No books found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
  });

  it('shows custom emptyText', () => {
    renderGrid({ books: [], emptyText: 'Nothing here yet' });
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('applies custom columns class', () => {
    const { container } = renderGrid({ columns: 'grid-cols-1' });
    expect(container.querySelector('.grid-cols-1')).toBeInTheDocument();
  });

  it('renders correct number of articles', () => {
    renderGrid();
    expect(screen.getAllByRole('article')).toHaveLength(2);
  });
});
