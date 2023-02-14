import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

interface ModalProps {
  children: ReactNode,
  setOnModal: (state: boolean) => void,
}

const Modal = ({children, setOnModal}: ModalProps) => {

  return (
    <ModalPortal>
      <Dimmed onClick={() => setOnModal(false)}>
          {children}
      </Dimmed>
    </ModalPortal>
  );
};

const Dimmed = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 30, 0.9);
  z-index: 1000;
`;

export { Modal };
