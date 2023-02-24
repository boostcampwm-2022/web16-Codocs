import React from 'react';
import styled from 'styled-components';

interface ThemeSwitcherProps {
  themeMode: string,
  toggleTheme: () => void,
}

interface ThemeSwitchButtonProps {
  themeMode: string;
}

const ThemeSwitcher = ({ themeMode, toggleTheme}: ThemeSwitcherProps) => {
  return (
      <ThemeSwitchButton themeMode={themeMode} onClick={toggleTheme}>
        {themeMode === 'light' ? '☀️' : '🌙'}
      </ThemeSwitchButton>
  );
};

const ThemeSwitchButton = styled('button')<ThemeSwitchButtonProps>`
  position: fixed;
  bottom: 3%;
  right: 3%;
  padding: 0.5rem;
  font-size: 2rem;
  line-height: 2rem;
  outline: none;
  border: 1px solid;
  border-radius: 50%;
  transition: 0.2s all ease-in;
  z-index: 2000;
  border-color: ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};

  :hover {
    background-color: ${({ theme }) => theme.reverseBackground};
  }
`;

export { ThemeSwitcher };