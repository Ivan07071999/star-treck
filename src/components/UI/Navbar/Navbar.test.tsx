import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';
import { createNavigation } from './navigation';
import { vi } from 'vitest';

vi.mock('./navigation', () => ({
  createNavigation: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: string;
    className: string;
  }) => (
    <a href={href} className={className} data-testid="nav-link">
      {children}
    </a>
  ),
}));

describe('Navbar component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders navigation links correctly', () => {
    const mockedCreateNavigation = vi.mocked(createNavigation);
    mockedCreateNavigation.mockReturnValue([
      { href: '/home', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ]);

    render(<Navbar locale="en" />);

    expect(mockedCreateNavigation).toHaveBeenCalledWith('en');

    const links = screen.getAllByTestId('nav-link');
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Contact');
  });

  it('handles empty navigation items', () => {
    const mockedCreateNavigation = vi.mocked(createNavigation);
    mockedCreateNavigation.mockReturnValue([]);

    render(<Navbar locale="en" />);

    const links = screen.queryAllByTestId('nav-link');
    expect(links).toHaveLength(0);
  });

  it('renders with different locales', () => {
    const mockedCreateNavigation = vi.mocked(createNavigation);
    mockedCreateNavigation.mockReturnValue([{ href: '/home', label: 'Accueil' }]);

    render(<Navbar locale="fr" />);

    const link = screen.getByTestId('nav-link');
    expect(link).toHaveTextContent('Accueil');
    expect(link).toHaveAttribute('href', '/home?locale=fr');
  });
});
