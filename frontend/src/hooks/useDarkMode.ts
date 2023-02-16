import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [themeMode, setTheme] = useState<string>('light');

  const saveThemeMode = (themeMode: string) => {
    window.localStorage.setItem('themeMode', themeMode);
    setTheme(themeMode);
  };

  const toggleTheme = () => {
    if (themeMode === 'light') {
      saveThemeMode('dark');
    } else {
      saveThemeMode('light');
    }
  };

  useEffect(() => {
    const isUserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isUserDarkMode) {
      setTheme('dark');
    } else {
      const localTheme = window.localStorage.getItem('themeMode');
      localTheme ? setTheme(localTheme) : setTheme('light');
    }
  }, []);

  return {themeMode, toggleTheme};
};

export default useDarkMode;