import React from 'react';
import styled from 'styled-components';
import { ModalDoubleChecker } from '../modalDoubleChecker';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';

interface DimmedProps {
  modalType: string;
}

const Modal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);

  const handleInitModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setModalData({
      type: 'INIT',
      clickHandler: () => {
        return Promise<void>;
      }
    });
  };

  return (
    <Dimmed modalType={modalData.type}>
      {modalData.type !== 'INIT' && (
        <ModalDoubleChecker
          modalType={modalData.type}
          modalCancelHandler={handleInitModal}
          modalActionHandler={modalData.clickHandler}
        />
      )}
    </Dimmed>
  );
};

const Dimmed = styled('div')<DimmedProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 30, 0.9);
  z-index: 1000;
  display: ${(props) => (props.modalType === 'INIT' ? 'none' : 'block')};
`;

export { Modal };
