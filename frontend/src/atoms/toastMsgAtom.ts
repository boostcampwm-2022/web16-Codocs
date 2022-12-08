import { atom } from 'recoil';

const toastMsgState = atom({
  key: 'toastMsg',
  default: {
    type: '', 
    msg: 'init'
  }
});

export { toastMsgState };
