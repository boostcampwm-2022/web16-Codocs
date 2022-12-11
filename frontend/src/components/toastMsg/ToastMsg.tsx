import React from 'react';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { toastMsgState } from '../../atoms/toastMsgAtom';
import { ReactComponent as PencilIcon } from '../../assets/pencil.svg';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';

const ToastMsg = () => {
  const toastMsg = useRecoilValue(toastMsgState);
  const TOAST_COLOR = toastMsg.type === 'INFO' ? '#3A7DFF' : '#FF3E3E';

  if (toastMsg.type !== 'INIT') {
    return (
      <ToastMsgWrapper key={+new Date()} color={TOAST_COLOR}>
        {toastMsg.type === 'INFO' ? (
          <PencilIcon width="16" height="16" fill="#3A7DFF" />
        ) : (
          <TrashIcon width="16" height="16" fill="#FF3E3E" />
        )}
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
  max-width: 640px;
  margin: auto;
  padding: 1.2rem 1rem;
  border: 2px solid ${(props) => props.color};
  border-radius: 10px;
  transform: translate(-50%);
  background-color: #fff;
  visibility: hidden;
  z-index: 99;
  animation: ${toggleVisibility} 3s 1;
`;

const ToastText = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.color};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
  word-break: break-all;
`;

export { ToastMsg };
