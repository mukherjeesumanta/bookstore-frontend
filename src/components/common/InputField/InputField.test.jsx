import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputField from './index';

describe('InputField', () => {
  it('renders a text input by default', () => {
    render(<InputField name="email" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders a label when label prop is provided', () => {
    render(<InputField name="username" label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('associates label with input via name as id fallback', () => {
    render(<InputField name="username" label="Username" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'username');
  });

  it('uses explicit id over name', () => {
    render(<InputField id="my-id" name="username" label="Username" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-id');
  });

  it('renders a select when as="select"', () => {
    render(
      <InputField name="size" as="select" label="Size">
        <option>S</option>
        <option>M</option>
      </InputField>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders a textarea when as="textarea"', () => {
    render(<InputField name="bio" as="textarea" label="Bio" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(<InputField name="email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('applies error border class when error is set', () => {
    render(<InputField name="email" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-[#C4622D]');
  });

  it('does not show error paragraph when no error', () => {
    render(<InputField name="email" />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('forwards value and onChange', async () => {
    const handler = vi.fn();
    render(<InputField name="q" value="hello" onChange={handler} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('hello');
  });

  it('renders placeholder text', () => {
    render(<InputField name="q" placeholder="Search…" />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });
});
