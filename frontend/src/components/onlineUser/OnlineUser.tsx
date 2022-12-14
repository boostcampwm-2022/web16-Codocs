import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownOption from '../dropdownOption/DropdownOption';
import { ReactComponent as TogetherIcon } from '../../assets/together.svg';
import { ReactComponent as OnlineIcon } from '../../assets/online.svg';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../atoms/onlineUserAtom';

interface OnlineUserState {
  id: string;
  name: string;
  color: string;
}

interface OptionOpenedProps {
  isOptionOpened: boolean;
}

const OnlineUser = () => {
  const [isOptionOpened, setIsOptionOpened] = useState<boolean>(false);
  const [onlineUserInfo, setOnlineUserInfo] = useRecoilState(onlineUserState);

  const handleOpenOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOptionOpened(() => !isOptionOpened);
  };

  return (
    <OnlineUserWrapper>
      <OnlineUserCount onClick={handleOpenOption}>
        <TogetherIcon fill={'#000'} />
        <BtnNumber>{onlineUserInfo.length}</BtnNumber>
      </OnlineUserCount>
      <OnlineUserList isOptionOpened={isOptionOpened}>
        {onlineUserInfo.map((person: OnlineUserState) => {
          return (
            <li key={person.id}>
              <DropdownOption optionTitle={person.name} optionValue={person.id}>
                <OnlineIcon fill={person.color} />
              </DropdownOption>
            </li>
            // <li key={index}>{index}</li>
          );
        })}
      </OnlineUserList>
    </OnlineUserWrapper>
  );
};

const OnlineUserWrapper = styled.div`
  width: 140px;
  z-index: 500;
  cursor: pointer;
`;

const OnlineUserCount = styled.span`
  display: flex;
  align-items: center;
`;

const BtnNumber = styled.span`
  font-weight: 500;
  font-size: 20px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
`;

const OnlineUserList = styled('ul')<OptionOpenedProps>`
  width: 140px;
  list-style-type: none;
  position: absolute;
  top: 3rem;
  right: 0;
  border-radius: 10px;
  padding: 0 0.25rem;
  margin: 0;
  background-color: #222;
  display: ${(props) => (props.isOptionOpened ? 'block' : 'none')};
`;

export { OnlineUser };
