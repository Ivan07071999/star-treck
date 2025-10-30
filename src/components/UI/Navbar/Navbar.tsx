'use client';
import './Navbar.css';
import Link from 'next/link';
import { createNavigation } from './navigation';

export const Navbar = ({ locale }: { locale: string }) => {
  const navigationItems = createNavigation(locale);

  return (
    <div className="navbar">
      <nav className="navbar__links">
        {navigationItems.map((item) => (
          <Link key={item.href} href={`${item.href}?locale=${locale}`} className="navbar__link">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
