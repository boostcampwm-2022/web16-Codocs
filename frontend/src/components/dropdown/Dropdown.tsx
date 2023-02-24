import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownMenu } from './DropdownMenu';
import { DropdownItem } from './DropdownItem';
import { ReactComponent as AngleDownIcon } from '../../assets/angle-down.svg';

interface DropdownProps {
  value: string,
  onClick: React.Dispatch<React.SetStateAction<string>>,
  options: {[key:string] : string},
}

const Dropdown = ({value, onClick, options}: DropdownProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false); 
  const theme = useTheme();

  return (
    <DropdownWrapper>
      <DropdownTrigger 
        value={options[value]}
        onClick={setIsOpened} 
        icon={
          <AngleDownIcon 
            fill={theme.reverseText}/>} />
      <DropdownMenu isOpened={isOpened}>
        {
          Object.keys(options).map((option, index) => (
              <DropdownItem 
                key={index} 
                value={option} 
                text={options[option]} 
                onClick={onClick}/>
            )
          )
        }
      </DropdownMenu>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  width: 140px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.reverseBackground};
`;

export { Dropdown };
