import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({children} : {children: ReactNode}) => {
  const modalRoot = document.getElementById('modal-root');
  return ReactDOM.createPortal(children, modalRoot as HTMLElement);
};

export default ModalPortal;