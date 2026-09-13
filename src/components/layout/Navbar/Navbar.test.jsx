import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import Navbar from './index';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderNavbar({ isLoggedIn = false, user = null, logout = vi.fn() } = {}) {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <AuthContext.Provider value={{ user, isLoggedIn, login: vi.fn(), logout }}>
        <CartProvider>
          <Navbar />
        </CartProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
}

const LOGGED_IN_USER = { name: 'Alex Reader', username: 'alexreader', orders: [] };

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
    expect(screen.getAllByRole('link', { name: /shopping cart/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('does not show cart badge when cart is empty', () => {
    renderNavbar();
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

  // ── Auth: logged-out state ──────────────────────────────────────────────

  it('shows Login link in desktop nav when logged out', () => {
    renderNavbar({ isLoggedIn: false });
    // Both the desktop text link and mobile icon link are rendered (CSS hides them at runtime)
    expect(screen.getAllByRole('link', { name: 'Login' }).length).toBeGreaterThanOrEqual(1);
  });

  it('shows Login icon in mobile area when logged out', () => {
    renderNavbar({ isLoggedIn: false });
    // Mobile login icon link has aria-label="Login"
    expect(screen.getAllByRole('link', { name: /login/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('does NOT show Logout button when logged out', () => {
    renderNavbar({ isLoggedIn: false });
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  // ── Auth: logged-in state ───────────────────────────────────────────────

  it('shows UserAvatar button when logged in', () => {
    renderNavbar({ isLoggedIn: true, user: LOGGED_IN_USER });
    expect(screen.getByRole('button', { name: /go to profile/i })).toBeInTheDocument();
  });

  it('shows Logout button in desktop nav when logged in', () => {
    renderNavbar({ isLoggedIn: true, user: LOGGED_IN_USER });
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('does NOT show Login link in desktop nav when logged in', () => {
    renderNavbar({ isLoggedIn: true, user: LOGGED_IN_USER });
    // "Login" link should not appear in the desktop nav
    expect(screen.queryByRole('link', { name: 'Login' })).not.toBeInTheDocument();
  });

  it('calls logout and navigates to / when Logout is clicked', async () => {
    const mockLogout = vi.fn();
    renderNavbar({ isLoggedIn: true, user: LOGGED_IN_USER, logout: mockLogout });
    await userEvent.click(screen.getByRole('button', { name: /logout/i }));
    expect(mockLogout).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('shows Profile and Logout in open mobile menu when logged in', async () => {
    renderNavbar({ isLoggedIn: true, user: LOGGED_IN_USER });
    await userEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    // Logout button appears in mobile menu too (multiple buttons OK)
    expect(screen.getAllByRole('button', { name: /logout/i }).length).toBeGreaterThanOrEqual(1);
  });
});
