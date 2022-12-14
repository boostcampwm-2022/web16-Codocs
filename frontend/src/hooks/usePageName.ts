import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface pageNames {
  [key: string]: string;
}

const usePageName = () => {
  const [pageName, setPageName] = useState('');
  const location = useLocation();

  const pageNamesByPath: pageNames = {
    main: '최근 문서 목록',
    private: '내 문서함',
    shared: '공유 문서함',
    bookmark: '북마크',
    trash: '휴지통'
  };

  useEffect(() => {
    const [lastPath] = location.pathname.split('/').slice(-1);
    setPageName(pageNamesByPath[lastPath]);
  });

  return { pageName };
};

export default usePageName;
