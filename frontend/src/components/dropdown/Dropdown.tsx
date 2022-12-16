import React, { useState, SetStateAction } from 'react';
import styled from 'styled-components';
import DropdownOption from '../dropdownOption/DropdownOption';
import { ReactComponent as AngleDownIcon } from '../../assets/angle-down.svg';

interface DropdownProps {
  selectedOption : string
  selectedOptionSetter: React.Dispatch<SetStateAction<string>>
}

interface OptionOpenedProps {
  isOptionOpened : boolean;
}

interface OptionMap {
  [key: string] : string
}

const Dropdown = ({selectedOption, selectedOptionSetter}: DropdownProps) => {
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
  const optionList: OptionMap = {
    'lastVisited': '최근 방문순',
    'title': '제목순',
    'createdAt': '생성일순'
  };

  const handleOpenOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOptionOpened(() => !isOptionOpened);
  };

  const handleSelectOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const clickedValue = e.currentTarget.value;
    if (Object.keys(optionList).includes(clickedValue)) {
      selectedOptionSetter(clickedValue); 
    }
    setIsOptionOpened(() => !isOptionOpened);
  };

  return (
    <DropdownWrapper isOptionOpened={isOptionOpened}>
      <DropdownOption optionTitle={optionList[selectedOption]} clickHandler={handleOpenOption} >
        <AngleDownIcon fill={'#fff'}/>
      </DropdownOption>
      <DropdownOptionList isOptionOpened={isOptionOpened}>
        {
          Object.keys(optionList).map((option, index) => {
            return (
              <li key={index}>
                <DropdownOption optionTitle={optionList[option]} optionValue={option} clickHandler={handleSelectOption} />
              </li>
            );
          })
        }
      </DropdownOptionList>
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled('div')<OptionOpenedProps>`
  width: 140px;
  border-radius: 10px;
  background-color: #222;
`;

const DropdownOptionList = styled('ul')<OptionOpenedProps>`
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
