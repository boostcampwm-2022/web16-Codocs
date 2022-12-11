import { atom } from 'recoil';
import { getRandomColor } from '../utils/utils';

const profileState = atom({
  key: 'profile',
  default: {
    username: 'anonymous',
    color: getRandomColor()
  }
});

export default profileState;
