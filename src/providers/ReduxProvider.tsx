'use client';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

const store = setupStore();

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
