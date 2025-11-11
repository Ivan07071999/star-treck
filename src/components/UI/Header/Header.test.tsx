import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from './Header';
import ThemeContext from '../../../context/ThemeContext';
import { ReactNode } from 'react';

type Theme = 'light' | 'dark';

const TestThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeValue = {
    theme: 'dark' as Theme,
    toggleTheme: vi.fn(),
  };

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};

describe('Header component', () => {
  it('render all elements', () => {
    render(
      <TestThemeProvider>
        <Header locale={'en'} />
      </TestThemeProvider>
    );

    expect(screen.getByText(/Star Trek/i)).toBeInTheDocument();
    expect(screen.getByText(/En/i)).toBeInTheDocument();
    expect(screen.getByText(/En/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset cache/i)).toBeInTheDocument();
    expect(screen.getByText(/☀️/i)).toBeInTheDocument();
  });

  it('toggle theme', () => {
    render(
      <TestThemeProvider>
        <Header locale={'en'} />
      </TestThemeProvider>
    );

    const themeButton = screen.getByTestId('switchTheme');
    const headerContainer = screen.getByRole('banner');
    fireEvent.click(themeButton);

    waitFor(() => {
      expect(screen.getByText(/🌙/i)).toBeInTheDocument();
      expect(headerContainer.classList.contains('light'));
    });
  });
});
