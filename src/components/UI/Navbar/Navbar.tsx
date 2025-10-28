// //import { Link } from 'react-router-dom';
'use client';
import { createNavigation } from './navigation';
import './Navbar.css';
import Link from 'next/link';

export const Navbar = () => {
  const navigationItems = createNavigation();

  return (
    <div className="navbar">
      <nav className="navbar__links">
        {navigationItems.map((item) => (
          <Link key={item.href} href={item.href} className="navbar__link">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};
