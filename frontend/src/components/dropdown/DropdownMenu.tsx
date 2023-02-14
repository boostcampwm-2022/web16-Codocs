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
  border-radius: 10px;
  padding: 0 0.25rem;
  margin: 0;
  background-color: #222;
  display: ${(props) => props.isOpened ? 'block' : 'none'};
`;

export { DropdownMenu };