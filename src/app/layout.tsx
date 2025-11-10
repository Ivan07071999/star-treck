/* eslint-disable react-refresh/only-export-components */
import { ThemeProvider } from '../context';
import { metadata } from './metadata';
import './globals.css';

export { metadata };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
