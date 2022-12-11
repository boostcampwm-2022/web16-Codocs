import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownOptionProps {
  optionTitle: string
  clickHandler?: React.MouseEventHandler
  children?: ReactNode,
}

const DropdownOption = ({optionTitle, clickHandler, children: dropdownIcon}: DropdownOptionProps) => {
  return (
    <DropdownOptionWrapper onClick={clickHandler} value={optionTitle}>
      {optionTitle}
      {dropdownIcon}
    </DropdownOptionWrapper>
  )
  ;
};

const DropdownOptionWrapper = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #fff;
  border-bottom: 1px solid #fff;
`;

export default DropdownOption;
