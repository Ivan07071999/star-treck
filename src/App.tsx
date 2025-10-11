import { SelectedItemsBar } from './index';
import { Header, AppRouter, ThemeProvider } from './index';
import './index.css';

export function App() {
  return (
    <ThemeProvider>
      <div className={`app`}>
        <Header />
        <AppRouter />
        <SelectedItemsBar />
      </div>
    </ThemeProvider>
  );
}
