import React from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { toastMsgState } from '../../atoms/toastMsgAtom';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as ExclamationIcon } from '../../assets/exclamation.svg';
import { devices } from '../../constants/breakpoints';

const ToastMsg = () => {
  const theme = useTheme();
  const {type, msg, key} = useRecoilValue(toastMsgState);
  
  const ICON_SIZE = 24;
  const TOAST_COLOR = type === 'INFO' 
                        ? theme.primary 
                        : theme.caution;

  if (type !== 'INIT') {
    return (
      <ToastMsgWrapper key={key} color={TOAST_COLOR}>
        {type === 'INFO' 
          ? <CheckIcon 
              width={ICON_SIZE}
              height={ICON_SIZE} 
              fill={TOAST_COLOR} />
          : <ExclamationIcon 
              width={ICON_SIZE}
              height={ICON_SIZE} 
              fill={TOAST_COLOR} />
        }
        <ToastText color={TOAST_COLOR}>{msg}</ToastText>
      </ToastMsgWrapper>
    );
  } else {
    return null;
  }
};

const toggleVisibility = keyframes`
  0% { visibility: visible; }
  10% { transform: translate(-50%, 6rem); }
  90% { transform: translate(-50%, 6rem); }
  99% { transform: translate(-50%, -4.5rem); }
  100% { visibility: hidden; }
`;

const ToastMsgWrapper = styled.div`
  position: fixed;
  top: -4.5rem;
  left: 50%;
  display: flex;
  align-items: center;
  min-width: 20rem;
  margin: auto;
  padding: 1.25rem;
  border-radius: 10px;
  z-index: 3000;
  visibility: hidden;
  transform: translate(-50%);
  border: 2px solid ${(props) => props.color};
  background-color: ${({ theme }) => theme.background};
  animation: ${toggleVisibility} 3s 1;
  
  @media ${devices.mobile} {
    min-width: 15rem;
  }
`;

const ToastText = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  text-align: center;
  word-break: break-all;
  margin: auto;
  color: ${(props) => props.color};
  text-shadow: ${({ theme }) => `0px 4px 4px ${theme.defaultShadow}`};;

  @media ${devices.mobile} {
    font-weight: 400;
    font-size: 1rem;
  }
`;

export { ToastMsg };
