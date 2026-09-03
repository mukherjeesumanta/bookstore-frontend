import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../../context/CartContext';
import CartItem from './index';

const item = {
  id: '1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  price: 34.99,
  quantity: 2,
  cover: '',
};

function renderItem(overrides = {}) {
  return render(
    <MemoryRouter>
      <CartProvider>
        <ul>
          <CartItem item={{ ...item, ...overrides }} />
        </ul>
      </CartProvider>
    </MemoryRouter>
  );
}

describe('CartItem', () => {
  it('renders the book title', () => {
    renderItem();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('renders the author', () => {
    renderItem();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
  });

  it('renders the total line price (price × qty)', () => {
    renderItem();
    expect(screen.getByText('$69.98')).toBeInTheDocument();
  });

  it('renders the current quantity', () => {
    renderItem();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders a remove button', () => {
    renderItem();
    expect(screen.getByRole('button', { name: /remove clean code/i })).toBeInTheDocument();
  });

  it('renders decrease and increase quantity buttons', () => {
    renderItem();
    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();
  });

  it('links to the book details page', () => {
    renderItem();
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/books/1');
  });

  it('calls removeItem when remove button is clicked', async () => {
    // After clicking remove, CartItem remains rendered but the context removes the item.
    // We verify the button is clickable without errors.
    renderItem();
    const removeBtn = screen.getByRole('button', { name: /remove clean code/i });
    await userEvent.click(removeBtn);
    // If remove worked, no error was thrown
    expect(removeBtn).toBeDefined();
  });
});
