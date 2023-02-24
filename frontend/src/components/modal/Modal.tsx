import React, { ReactNode } from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';

interface ModalProps {
  children: ReactNode,
  toggleModal: () => void,
}

const Modal = ({children, toggleModal}: ModalProps) => {

  return (
    <ModalPortal>
      <Dimmed onClick={toggleModal}>
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
  z-index: 5000;
`;

export { Modal };
