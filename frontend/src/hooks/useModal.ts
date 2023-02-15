import { useState } from 'react';

interface ModalDataState {
  modalType: string | null,
  actionHandler: WrappedHandler | null,
}

const useModal = () => {
  const [onModal, setOnModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalDataState>({modalType: null, actionHandler: null});

  const toggleModal = () => {
    setOnModal(!onModal);
  };

  const setupModalData = (modalType: string, actionHandler: WrappedHandler) => {
    setModalData({
      modalType,
      actionHandler,
    });
  };

  return {onModal, toggleModal, modalData, setupModalData};
};

export default useModal;
