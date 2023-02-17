import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import DropdownOption from '../dropdownOption/DropdownOption';
import { ReactComponent as TogetherIcon } from '../../assets/together.svg';
import { ReactComponent as OnlineIcon } from '../../assets/online.svg';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../atoms/onlineUserAtom';
import { devices } from '../../constants/breakpoints';

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
  const theme = useTheme();

  const handleOpenOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOptionOpened(() => !isOptionOpened);
  };

  return (
    <OnlineUserWrapper>
      <OnlineUserCount onClick={handleOpenOption}>
        <TogetherIcon fill={theme.text} />
        <BtnNumber>
          {onlineUserInfo.length}
        </BtnNumber>
      </OnlineUserCount>
      <OnlineUserList isOptionOpened={isOptionOpened}>
        {onlineUserInfo.map((person: OnlineUserState) =>
          <DropdownOption 
            key={person.id} 
            optionTitle={person.name} 
            optionValue={person.id}>
              <OnlineIcon fill={person.color} />
          </DropdownOption>
        )}
      </OnlineUserList>
    </OnlineUserWrapper>
  );
};

const OnlineUserWrapper = styled.div`
  z-index: 500;
  cursor: pointer;
`;

const OnlineUserCount = styled.span`
  display: flex;
  align-items: center;
`;

const BtnNumber = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.text};
  text-shadow: ${({ theme }) => `0px 4px 4px ${theme.defaultShadow}`};

  @media ${devices.mobile} {
    display: none;
  }
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
  background-color: ${({ theme }) => theme.reverseBackground};
  display: ${(props) => (props.isOptionOpened ? 'block' : 'none')};

  li:last-child {
    border: none;
  }
`;

export { OnlineUser };
