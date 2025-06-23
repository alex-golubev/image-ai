import { render, screen } from '@testing-library/react';
import Home from '~/app/page';

describe('Home page', () => {
  it('renders the main heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('image AI');
  });

  it('has correct styling classes for centering', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toHaveClass('flex items-center justify-center min-h-screen');
  });

  it('heading has correct font styling', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-5xl');
  });

  it('renders without crashing', () => {
    expect(() => render(<Home />)).not.toThrow();
  });
});
