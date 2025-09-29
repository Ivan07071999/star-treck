import { Link } from 'react-router-dom';
import './notFound.css';

export function NotFound() {
  return (
    <div className="container-err">
      <h1 className="title-err">404</h1>
      <p className="message-err">Page not found</p>
      <Link to="/" className="link-err">
        Back to main page
      </Link>
    </div>
  );
}
