import { useState, useEffect } from 'react';

const useDebounce = () => {
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  return [setDebounceTimer];
};

export default useDebounce;
