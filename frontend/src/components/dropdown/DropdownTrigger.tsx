import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface DropdownTriggerProps {
  value: string,
  onClick: React.Dispatch<React.SetStateAction<boolean>>,
  icon?: ReactNode;
}

const DropdownTrigger = ({value, onClick, icon}: DropdownTriggerProps) => {
  
  const handleOptionDisplay = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick((isOpened) => !isOpened);
  };

  return (
    <Dropdown_Trigger onClick={handleOptionDisplay}>
      {value && 
        <SelectedOption>
          {value}
        </SelectedOption>
      }
      {icon}
    </Dropdown_Trigger>
  );
};

const Dropdown_Trigger = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem;
  color: #fff;
  border-bottom: 1px solid #fff;
`;

const SelectedOption = styled.span`
  white-space: pre-line;
`;

export { DropdownTrigger };
