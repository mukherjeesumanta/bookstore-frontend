import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './index';

const categories = ['All', 'Fiction', 'Mystery', 'Sci-Fi'];

describe('CategoryFilter', () => {
  it('renders a button for each category', () => {
    render(<CategoryFilter categories={categories} selected="All" onSelect={() => {}} />);
    categories.forEach((cat) => {
      expect(screen.getByRole('button', { name: cat })).toBeInTheDocument();
    });
  });

  it('marks the selected category with active styles', () => {
    render(<CategoryFilter categories={categories} selected="Fiction" onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: 'Fiction' })).toHaveClass('bg-[#2C3A1E]');
  });

  it('inactive buttons do not have active styles', () => {
    render(<CategoryFilter categories={categories} selected="Fiction" onSelect={() => {}} />);
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass('bg-[#2C3A1E]');
  });

  it('calls onSelect with category name when clicked', async () => {
    const handler = vi.fn();
    render(<CategoryFilter categories={categories} selected="All" onSelect={handler} />);
    await userEvent.click(screen.getByRole('button', { name: 'Mystery' }));
    expect(handler).toHaveBeenCalledWith('Mystery');
  });

  it('renders nothing when categories is empty', () => {
    const { container } = render(<CategoryFilter categories={[]} selected="" onSelect={() => {}} />);
    expect(container.querySelectorAll('button')).toHaveLength(0);
  });

  it('applies extra className to wrapper', () => {
    const { container } = render(<CategoryFilter categories={categories} selected="All" onSelect={() => {}} className="mt-4" />);
    expect(container.firstChild).toHaveClass('mt-4');
  });
});
