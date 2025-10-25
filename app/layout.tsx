import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Trek Seasons',
  description: 'Explore Star Trek seasons and episodes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
