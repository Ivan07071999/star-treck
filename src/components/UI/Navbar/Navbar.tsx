import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/about">About</Link>
        <Link to="/seasons">Posts</Link>
      </div>
    </div>
  );
};
