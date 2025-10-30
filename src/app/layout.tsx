import type { Metadata } from 'next';
import { ThemeProvider } from '../context';
import './globals.css';
import Script from 'next/script';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'Star Trek Seasons',
  description: 'Explore Star Trek seasons and episodes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Script src="https://cdn.example.com/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
