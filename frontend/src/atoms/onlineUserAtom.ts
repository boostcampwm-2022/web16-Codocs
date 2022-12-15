import { atom } from 'recoil';

const onlineUserState = atom<OnlineUserType[]>({
  key: 'onlineUser',
  default: []
});

export { onlineUserState };
