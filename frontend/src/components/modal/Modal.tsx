import React, { useRef } from 'react';
import styled from 'styled-components';
import { ModalDoubleChecker } from '../modalDoubleChecker';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';

interface DimmedProps {
  modalType: string;
}

const Modal = () => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const dimmedRef = useRef<HTMLDivElement | null>(null);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target) {
      setModalData({
        type: 'INIT',
        clickHandler: () => {
          return Promise<void>;
        }
      });
      console.log(modalData);
    }
  };

  return (
    <Dimmed ref={dimmedRef} modalType={modalData.type} onClick={handleCloseModal}>
      {modalData.clickHandler && (
        <ModalDoubleChecker
          modalType={modalData.type}
          modalCancelHandler={handleCloseModal}
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
