import { Route, Routes, Navigate } from 'react-router-dom';
import { About, NotFound, MainPage } from '../index';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/seasons?page=1" replace />} />
      <Route path="/seasons" element={<MainPage />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
