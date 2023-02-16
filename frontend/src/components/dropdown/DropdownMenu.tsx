import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownMenuProps {
  isOpened: boolean,
  children: ReactNode,
}

interface MenuProps {
  isOpened: boolean,
}

const DropdownMenu = ({isOpened, children}: DropdownMenuProps) => {
  return (
    <Dropdown_Menu isOpened={isOpened}>
      {children}
    </Dropdown_Menu>
  );
};

const Dropdown_Menu = styled('ul')<MenuProps>`
  width: 140px;
  list-style-type: none;
  position: absolute;
  padding: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.background};
  display: ${(props) => props.isOpened ? 'block' : 'none'};

  li:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  li:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export { DropdownMenu };