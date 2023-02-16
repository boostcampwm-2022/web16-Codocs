import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownOptionProps {
  optionTitle: string;
  optionValue?: string;
  clickHandler?: React.MouseEventHandler;
  children?: ReactNode;
}

const DropdownOption = ({
  optionTitle,
  optionValue,
  clickHandler,
  children: dropdownIcon
}: DropdownOptionProps) => {
  return (
    <DropdownOptionWrapper 
      onClick={clickHandler} 
      value={optionValue}>
        <OptionTitle>{optionTitle}</OptionTitle>
        {dropdownIcon}
    </DropdownOptionWrapper>
  );
};

const DropdownOptionWrapper = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.reverseText};
`;

const OptionTitle = styled.span`
  white-space: pre-line;
`;

export default DropdownOption;
