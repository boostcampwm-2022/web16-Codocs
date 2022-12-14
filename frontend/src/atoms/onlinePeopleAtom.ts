import { atom } from 'recoil';

const onlinePeopleState = atom({
  key: 'onlinePeople',
  default: [
    {
      id: 'test1',
      name: 'J001',
      color: '#770287'
    },
    {
      id: 'test2',
      name: 'J128',
      color: '#778589'
    },
    {
      id: 'test3',
      name: 'J164',
      color: '#F39B2B'
    }
  ]
});

export { onlinePeopleState };
