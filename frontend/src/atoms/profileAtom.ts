import { atom } from 'recoil';
import { getRandomColor } from '../utils/utils';

const RANDOM_COLOR = getRandomColor();

const profileState = atom({
  key: 'profile',
  default: {
    name: 'anonymous',
    color: RANDOM_COLOR,
    profileURL: ''
  }
});

export default profileState;
