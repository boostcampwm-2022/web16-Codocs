import React, { useState } from 'react';
import styled from 'styled-components';
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

  return (
    <DropdownWrapper>
      <DropdownTrigger value={options[value]} onClick={setIsOpened} icon={<AngleDownIcon fill={'#fff'}/>} />
      <DropdownMenu isOpened={isOpened}>
        {
          Object.keys(options).map((option, index) => (
              <DropdownItem key={index} text={options[option]} value={option} onClick={onClick}/>
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
  background-color: #222;
`;

export { Dropdown };
