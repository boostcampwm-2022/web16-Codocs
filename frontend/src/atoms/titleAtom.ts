import { atom } from 'recoil';

const titleState = atom({
  key: 'title',
  default: 'Untitled'
});

export { titleState };
