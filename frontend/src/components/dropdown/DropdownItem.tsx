import React from 'react';
import styled from 'styled-components';

interface DropdownItemProps {
  text: string,
  value: string,
  onClick: React.Dispatch<React.SetStateAction<string>>,
}

const DropdownItem = ({text, value, onClick}: DropdownItemProps) => {
  
  const handleItemSelection = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    onClick(String(target.dataset['value']));
  };

  return (
    <Dropdown_Item onClick={handleItemSelection} data-value={value}>
      {text}
    </Dropdown_Item>
  );
};

const Dropdown_Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.75rem;
  color: #fff;
  border-bottom: 1px solid #fff;
  cursor: pointer;
`;

export { DropdownItem };