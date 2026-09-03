import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './index';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('renders the brand name', () => {
    renderFooter();
    expect(screen.getByText('Leaf & Letter')).toBeInTheDocument();
  });

  it('renders the copyright notice', () => {
    renderFooter();
    expect(screen.getByText(/copyright © 2024/i)).toBeInTheDocument();
  });

  it('renders Shop section heading', () => {
    renderFooter();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });

  it('renders About section heading', () => {
    renderFooter();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders Help section heading', () => {
    renderFooter();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('renders All Books link pointing to /catalogue', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: 'All Books' })).toHaveAttribute('href', '/catalogue');
  });

  it('renders Fiction link pointing to /catalogue?cat=Fiction', () => {
    renderFooter();
    expect(screen.getByRole('link', { name: 'Fiction' })).toHaveAttribute('href', '/catalogue?cat=Fiction');
  });

  it('renders the address', () => {
    renderFooter();
    expect(screen.getByText(/133 Sussin Street/i)).toBeInTheDocument();
  });
});
