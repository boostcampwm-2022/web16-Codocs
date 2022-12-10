import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownOption from '../dropdownOption/DropdownOption';
import { ReactComponent as AngleDownIcon } from '../../assets/angle-down.svg';

interface optionOpenedProps {
  isOptionOpened : boolean;
}

const Dropdown = () => {
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('최근 방문순');
  const optionList = ['최근 방문순', '제목순', '생성일순'];

  const handleOpenOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOptionOpened(() => !isOptionOpened);
  };

  const handleSelectOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedOption(e.currentTarget.innerText);
    setIsOptionOpened(() => !isOptionOpened);
  };

  return (
    <DropdownWrapper isOptionOpened={isOptionOpened}>
      <DropdownOption optionTitle={selectedOption} clickHandler={handleOpenOption} >
        <AngleDownIcon fill={'#fff'}/>
      </DropdownOption>
      <DropdownOptionList isOptionOpened={isOptionOpened}>
        {
          optionList.map((option, index) => {
            return (
              <li key={index}>
                <DropdownOption optionTitle={option} clickHandler={handleSelectOption} />
              </li>
            );
          })
        }
      </DropdownOptionList>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled('div')<optionOpenedProps>`
  width: 140px;
  border-radius: 10px;
  background-color: #222;
`;

const DropdownOptionList = styled('ul')<optionOpenedProps>`
  width: 140px;
  list-style-type: none;
  position: absolute;
  border-radius: 10px;
  padding: 0 0.25rem;
  margin: 0;
  background-color: #222;
  display: ${(props) => props.isOptionOpened ? 'block' : 'none'};
`;

export { Dropdown };
