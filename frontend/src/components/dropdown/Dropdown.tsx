import React, { useState } from 'react';
import styled from 'styled-components';
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
      <DropdownOption onClick={handleOpenOption}>
        <OptionTitle>{selectedOption}</OptionTitle>
        <AngleDownIcon fill={'#fff'}/>
      </DropdownOption>
      <DropdownOptionList isOptionOpened={isOptionOpened}>
        {
          optionList.map((option, index) => {
            return (
              <li key={index}>
                <DropdownOption onClick={handleSelectOption}>
                  <OptionTitle>{option}</OptionTitle>
                </DropdownOption>
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
  background-color: #222;
  border-radius: ${(props) => props.isOptionOpened ? '10px 10px 0 0' : '10px'};
`;

const DropdownOption = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #fff;
  border-bottom: 1px solid #D9D9D9;
`;

const OptionTitle = styled.span`
  padding-right: 0.5rem;
`;

const DropdownOptionList = styled('ul')<optionOpenedProps>`
  width: 140px;
  list-style-type: none;
  position: absolute;
  border-radius: 0 0 10px 10px;
  padding: 0 0.25rem;
  margin: 0;
  background-color: #222;
  display: ${(props) => props.isOptionOpened ? 'block' : 'none'};
`;

export { Dropdown };
