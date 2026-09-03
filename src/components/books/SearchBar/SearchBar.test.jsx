import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './index';

describe('SearchBar', () => {
  it('renders a search input', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('shows the current value', () => {
    render(<SearchBar value="react" onChange={() => {}} />);
    expect(screen.getByRole('searchbox')).toHaveValue('react');
  });

  it('shows custom placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} placeholder="Find a book…" />);
    expect(screen.getByPlaceholderText('Find a book…')).toBeInTheDocument();
  });

  it('shows default placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const handler = vi.fn();
    render(<SearchBar value="" onChange={handler} />);
    await userEvent.type(screen.getByRole('searchbox'), 'js');
    expect(handler).toHaveBeenCalled();
  });

  it('applies extra wrapper className', () => {
    const { container } = render(<SearchBar value="" onChange={() => {}} className="max-w-md" />);
    expect(container.firstChild).toHaveClass('max-w-md');
  });
});
