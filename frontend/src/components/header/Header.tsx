import React from 'react';
import styled from 'styled-components';
import { SiteLogo } from '../siteLogo';
import { UserProfile } from '../userProfile';
import usePageName from '../../hooks/usePageName';

const Header = () => {
  const { pageName } = usePageName();

  const profileProps = {
    profileImgURL: 'https://picsum.photos/200',
    userName: 'iyu88'
  };

  return (
    <HeaderWrapper>
      <SiteLogo />
      <PageName>{pageName}</PageName>
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

const PageName = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

export { Header };