import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownOption from '../dropdownOption/DropdownOption';
import { ReactComponent as TogetherIcon } from '../../assets/together.svg';
import { ReactComponent as OnlineIcon } from '../../assets/online.svg';

interface OnlinePeopleState {
  id: string,
  name: string,
  color: string,
}

interface OptionOpenedProps {
  isOptionOpened : boolean;
}

const OnlinePeople = () => {
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
  const [onlinePeopleInfo, setOnlinePeopleInfo] = useState<OnlinePeopleState[]>([
    {
      id: 'test1',
      name: 'J001',
      color: '#770287'
    },
    {
      id: 'test2',
      name: 'J128',
      color: '#778589'
    }, 
    {
      id: 'test3',
      name: 'J164',
      color: '#F39B2B'
    },
  ]);

  const handleOpenOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOptionOpened(() => !isOptionOpened);
  };

  return (
    <OnlinePeopleWrapper>
      <OnlinePeopleCount onClick={handleOpenOption}>
        <TogetherIcon fill={'#000'}/>
        <BtnNumber>{onlinePeopleInfo.length}</BtnNumber>
      </OnlinePeopleCount>
      <OnlinePeopleList isOptionOpened={isOptionOpened}>
      {
        onlinePeopleInfo.map(person => {
          return (
            <li key={person.id}>
              <DropdownOption optionTitle={person.name} optionValue={person.id}>
                <OnlineIcon fill={person.color}/>
              </DropdownOption>
            </li>
          );
        })
      }
      </OnlinePeopleList>
    </OnlinePeopleWrapper>
  );
};

const OnlinePeopleWrapper = styled.div`
  width: 140px;
  z-index: 500;
  cursor: pointer;
`;

const OnlinePeopleCount = styled.span`
  display: flex;
  align-items: center;
`;

const BtnNumber = styled.span`
  font-weight: 500;
  font-size: 20px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
`;

const OnlinePeopleList = styled('ul')<OptionOpenedProps>`
  width: 140px;
  list-style-type: none;
  position: absolute;
  top: 3rem;
  right: 0;
  border-radius: 10px;
  padding: 0 0.25rem;
  margin: 0;
  background-color: #222;
  display: ${(props) => props.isOptionOpened ? 'block' : 'none'};
`;

export { OnlinePeople };
