import { useState, useEffect } from 'react';
import socket from '../core/sockets/sockets';
import useToast from './useToast';

const { REACT_APP_API_URL } = process.env;

const useDocumentTitle = (initialTitle: string) => {
  const [documentTitle, setDocumentTitle] = useState<string>(initialTitle);
  const { alertToast } = useToast();

  useEffect(() => {
    socket.connect();
    socket.on('new-title', setDocumentTitle);
    return () => {
      socket.removeAllListeners();
    };
  }, [documentTitle]);

  const fetchNewTitle = async (document_id: string) => {
    try {
      await fetch(`${REACT_APP_API_URL}/document/${document_id}/save-title`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title: documentTitle })
      });
    } catch (err) {
      alertToast('WARNING', '제목 저장에 실패했어요. 🥲  다시 시도해주세요.');
    }
  };

  const updateDocumentTitle = (document_id: string) => {
    fetchNewTitle(document_id);
    socket.emit('update-title', documentTitle);
  };

  return {
    documentTitle,
    setDocumentTitle,
    updateDocumentTitle,
  };
};

export default useDocumentTitle;
