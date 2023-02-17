import React from 'react';
import ReactDOM from 'react-dom';
import { ToastMsg } from './ToastMsg';

const ToastPortal = () => {
  const toastRoot = document.getElementById('toast-root');
  return ReactDOM.createPortal(<ToastMsg />, toastRoot as HTMLElement );
};

export default ToastPortal;
