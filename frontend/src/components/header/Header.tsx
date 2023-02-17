import React, { Suspense } from 'react';
import styled from 'styled-components';
import { SiteLogo } from '../siteLogo';
import { UserProfile } from '../userProfile';
import { Spinner } from '../spinner';
import usePageName from '../../hooks/usePageName';

const Header = () => {
  const { pageName } = usePageName();

  return (
    <HeaderWrapper>
      <SiteLogo />
      <PageName>{pageName}</PageName>
      <Suspense fallback={<Spinner />}>
        <UserProfile />
      </Suspense>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const PageName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export { Header };
