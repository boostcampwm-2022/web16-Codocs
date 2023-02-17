import { atom } from 'recoil';

const toastMsgState = atom({
  key: 'toastMsg',
  default: {
    type: 'INIT', 
    msg: '',
    key: 0,
  }
});

export { toastMsgState };
