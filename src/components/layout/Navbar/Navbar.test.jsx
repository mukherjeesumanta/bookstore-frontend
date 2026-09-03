import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../../context/CartContext';
import Navbar from './index';

function renderNavbar() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <CartProvider>
        <Navbar />
      </CartProvider>
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderNavbar();
    expect(screen.getByText('Leaf & Letter')).toBeInTheDocument();
  });

  it('renders Home and Catalogue nav links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Catalogue' })).toBeInTheDocument();
  });

  it('renders Cart link', () => {
    renderNavbar();
    // Both desktop and mobile render a "Shopping cart" aria-label link
    expect(screen.getAllByRole('link', { name: /shopping cart/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('does not show cart badge when cart is empty', () => {
    renderNavbar();
    // No badge spans with numbers expected
    const badges = screen.queryAllByText(/^\d+$/);
    expect(badges).toHaveLength(0);
  });

  it('renders a toggle menu button on mobile', () => {
    renderNavbar();
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    await userEvent.click(toggle);
    // Mobile menu nav appears — Home link appears twice (desktop + mobile)
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    expect(homeLinks.length).toBeGreaterThanOrEqual(2);
  });

  it('closes mobile menu when toggle is clicked again', async () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    expect(homeLinks).toHaveLength(1);
  });
});
