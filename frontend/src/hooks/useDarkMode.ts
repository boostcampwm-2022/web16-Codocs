import { useState } from 'react';

const useDarkMode = () => {
  const [themeMode, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    if (themeMode === 'light') {
      setTheme(() => 'dark');
    } else {
      setTheme(() => 'light');
    }
  };

  return {themeMode, toggleTheme};
};

export default useDarkMode;