import { api, Navbar, useTheme, useAppDispatch, setAllSeasons, MyButton } from '../../../index';
import './header.css';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();

  const handleResetCache = () => {
    dispatch(api.util.resetApiState());
    dispatch(setAllSeasons([]));
  };

  return (
    <header className={`header ${theme}`}>
      <h1 className="title">Star Trek</h1>
      <Navbar />
      <MyButton onClick={handleResetCache}>Reset cache</MyButton>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};
