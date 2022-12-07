import React, { useEffect } from 'react';
import socket from '../core/sockets/sockets';
import { useRecoilState } from 'recoil';
import { titleState } from '../atoms/titleAtom';

const useTitle = () => {
  const [title, setTitle] = useRecoilState(titleState);
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTitleUpdate = () => {
    socket.emit('title-update', title);
  };

  useEffect(() => {
    socket.on('new-title', (newTitle) => {
      setTitle(newTitle);
    });
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return {
    title,
    onTitleChange,
    onTitleUpdate
  };
};

export default useTitle;
