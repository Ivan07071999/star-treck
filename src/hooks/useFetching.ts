/* eslint-disable unicorn/filename-case */
import { useState } from 'react';

export const useFetching = (
  callback: () => Promise<void>
): [() => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
