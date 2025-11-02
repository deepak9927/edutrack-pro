import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import '@testing-library/jest-dom';

describe('LoadingSpinner', () => {
  test('renders with default size and color', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-6 w-6'); // default size
    expect(spinner).toHaveClass('text-primary'); // default color
  });

  test('renders with custom size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('h-8 w-8');
  });

  test('renders with custom color', () => {
    render(<LoadingSpinner color="secondary" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('text-secondary');
  });

  test('renders with custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('custom-class');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<LoadingSpinner ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveRole('status');
  });

  test('has visually hidden text for accessibility', () => {
    render(<LoadingSpinner />);
    const hiddenText = screen.getByText('Loading...');
    expect(hiddenText).toBeInTheDocument();
    expect(hiddenText).toHaveClass('!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]');
  });
});