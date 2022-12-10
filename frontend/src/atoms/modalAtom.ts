import { atom } from 'recoil';

const modalState = atom({
  key: 'modal',
  default: true,
});

export { modalState };
