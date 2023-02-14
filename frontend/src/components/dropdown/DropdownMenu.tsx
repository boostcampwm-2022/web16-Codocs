import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownMenuProps {
  display: boolean,
  children: ReactNode,
}

interface MenuProps {
  display: boolean,
}

const DropdownMenu = ({display, children}: DropdownMenuProps) => {
  return (
    <Dropdown_Menu display={display}>
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
  display: ${(props) => props.display ? 'block' : 'none'};
`;

export { DropdownMenu };