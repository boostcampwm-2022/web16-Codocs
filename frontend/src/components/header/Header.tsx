import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { SiteLogo } from '../siteLogo';
import { UserProfile } from '../userProfile';

interface pageTitles {
  [key: string] : string, 
}

const Header = () => {
  const [currentPath, setCurrentPath] = useState('');
  const location = useLocation();

  const pageTitleByPath: pageTitles = {
    'main': '최근 문서 목록',
    'private' : '내 문서함',
    'shared' : '공유 문서함',
  };

  useEffect(() => {
    const lastPath = location.pathname.split('/').slice(-1);
    setCurrentPath(pageTitleByPath[lastPath[0]]);
  }, [location]);
  
  const profileProps = {
    profileImgURL: 'https://picsum.photos/200',
    userName: 'iyu88'
  };

  return (
    <HeaderWrapper>
      <SiteLogo />
      <PageTitle>{currentPath}</PageTitle>
      <UserProfile {...profileProps}/>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #BBBBBB;
`;

const PageTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export { Header };