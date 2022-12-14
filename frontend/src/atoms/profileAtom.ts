import { atom } from 'recoil';
import { getRandomColor } from '../utils/utils';

const profileState = atom({
  key: 'profile',
  default: {
    name: 'anonymous',
    color: getRandomColor(),
    profileURL: ''
  }
});

export default profileState;
