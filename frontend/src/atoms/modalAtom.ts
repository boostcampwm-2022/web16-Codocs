import { atom } from 'recoil';

const modalState = atom({
  key: 'modal',
  default: false,
});

export { modalState };
