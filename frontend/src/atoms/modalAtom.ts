import { atom } from 'recoil';

const modalState = atom({
  key: 'modal',
  default: {
    type: 'INIT',
    clickHandler: () => { 
      return; 
    }
  },
});

export { modalState };
