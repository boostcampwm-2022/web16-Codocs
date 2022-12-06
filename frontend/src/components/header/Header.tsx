import React from 'react';
import styled from 'styled-components';
import { SiteLogo } from '../siteLogo';
import { UserProfile } from '../userProfile';

const Header = () => {
  const profileProps = {
    profileImgURL: 'https://picsum.photos/200',
    userName: 'iyu88'
  };

  return (
    <HeaderWrapper>
      <SiteLogo />
      <PageTitle>최근 문서 목록</PageTitle>
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