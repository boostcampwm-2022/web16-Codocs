import React from 'react';
import styled, { useTheme, keyframes } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { toastMsgState } from '../../atoms/toastMsgAtom';
import { ReactComponent as CheckIcon } from '../../assets/check.svg';
import { ReactComponent as ExclamationIcon } from '../../assets/exclamation.svg';

const ToastMsg = () => {
  const theme = useTheme();
  const toastMsg = useRecoilValue(toastMsgState);
  
  const ICON_SIZE = 24;
  const TOAST_COLOR = toastMsg.type === 'INFO' 
                        ? theme.primary 
                        : theme.caution;

  if (toastMsg.type !== 'INIT') {
    return (
      <ToastMsgWrapper key={+new Date()} color={TOAST_COLOR}>
        {toastMsg.type === 'INFO' 
          ? <CheckIcon 
              width={ICON_SIZE}
              height={ICON_SIZE} 
              fill={TOAST_COLOR} />
          : <ExclamationIcon 
              width={ICON_SIZE}
              height={ICON_SIZE} 
              fill={TOAST_COLOR} />
        }
        <ToastText color={TOAST_COLOR}>{toastMsg.msg}</ToastText>
      </ToastMsgWrapper>
    );
  } else {
    return null;
  }
};

const toggleVisibility = keyframes`
  0% { visibility: visible; }
  10% { transform: translate(-50%, 96px); }
  90% { transform: translate(-50%, 96px); }
  99% { transform: translate(-50%, -70px); }
  100% { visibility: hidden; }
`;

const ToastMsgWrapper = styled.div`
  position: fixed;
  top: -70px;
  left: 50%;
  display: flex;
  align-items: center;
  max-width: 640px;
  margin: auto;
  padding: 1.2rem 1rem;
  border-radius: 10px;
  z-index: 99;
  visibility: hidden;
  transform: translate(-50%);
  border: 2px solid ${(props) => props.color};
  background-color: ${({ theme }) => theme.background};
  animation: ${toggleVisibility} 3s 1;
`;

const ToastText = styled.span`
  font-weight: 500;
  font-size: 1.5rem;
  word-break: break-all;
  margin-left: 0.5rem;
  color: ${(props) => props.color};
  text-shadow: ${({ theme }) => `0px 4px 4px ${theme.defaultShadow}`};;
`;

export { ToastMsg };
