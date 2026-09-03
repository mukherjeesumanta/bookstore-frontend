import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import OrderConfirmation from './index';

const orderState = {
  orderId: 'LL1234567890',
  items: [
    { id: '1', title: 'The Pragmatic Programmer', author: 'David Thomas', price: 39.99, quantity: 1, cover: '' },
  ],
  subtotal: 39.99,
  shippingCost: 5.99,
  tax: 3.20,
  total: 49.18,
  shippingAddress: { name: 'Jane Doe', line1: '123 Main St', line2: 'Springfield, IL 62701' },
  paymentMethod: 'Visa **** 4242',
  estimatedDelivery: 'Jan 10, 2025 - Jan 12, 2025',
};

function renderConfirmation(state = orderState) {
  return render(
    <MemoryRouter
      initialEntries={[{ pathname: '/order-confirmation', state: { order: state } }]}
    >
      <Routes>
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </MemoryRouter>
  );
}

function renderFallback() {
  return render(
    <MemoryRouter initialEntries={['/order-confirmation']}>
      <Routes>
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('OrderConfirmation page', () => {
  it('renders the thank you heading', () => {
    renderConfirmation();
    expect(screen.getByText(/thank you for your order/i)).toBeInTheDocument();
  });

  it('renders the order number', () => {
    renderConfirmation();
    expect(screen.getByText(/LL1234567890/)).toBeInTheDocument();
  });

  it('renders estimated delivery date', () => {
    renderConfirmation();
    expect(screen.getByText(/Jan 10, 2025/)).toBeInTheDocument();
  });

  it('renders Your Order Items section', () => {
    renderConfirmation();
    expect(screen.getByText('Your Order Items')).toBeInTheDocument();
  });

  it('renders item title in order items', () => {
    renderConfirmation();
    expect(screen.getByText('The Pragmatic Programmer')).toBeInTheDocument();
  });

  it('renders Shipping & Payment Summary section', () => {
    renderConfirmation();
    expect(screen.getByText(/shipping & payment summary/i)).toBeInTheDocument();
  });

  it('renders shipping address', () => {
    renderConfirmation();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
  });

  it('renders payment method', () => {
    renderConfirmation();
    expect(screen.getByText('Visa **** 4242')).toBeInTheDocument();
  });

  it('renders total amount', () => {
    renderConfirmation();
    expect(screen.getByText('$49.18')).toBeInTheDocument();
  });

  it('renders Continue Shopping button', () => {
    renderConfirmation();
    expect(screen.getByRole('button', { name: /continue shopping/i })).toBeInTheDocument();
  });

  it('renders Need Help section with FAQ link', () => {
    renderConfirmation();
    expect(screen.getByText('Need Help?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
  });

  it('falls back to FALLBACK_ORDER when no state provided', () => {
    renderFallback();
    expect(screen.getByText(/LL9876543210/)).toBeInTheDocument();
  });
});
