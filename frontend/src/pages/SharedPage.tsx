import React, { Suspense } from 'react';
import styled from 'styled-components';
import usePageName from '../hooks/usePageName';
import { DocList } from '../components/docList';
import { Spinner } from '../components/spinner';
import { Dropdown } from '../components/dropdown';

const SharedPage = () => {
  const { pageName } = usePageName();

  return (
    <ContentWrapper>
      <ContentHeaderGroup>
        <PageName>{pageName}</PageName>
        <Dropdown />
      </ContentHeaderGroup>
      <Suspense fallback={<Spinner/>}>
        <DocList />
      </Suspense>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.section`
  flex: 1;
  margin: 3rem 3.5rem;
  overflow-y: scroll;
`;

const ContentHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageName = styled.h1`
  font-weight: 800;
  font-size: 2rem;
`;

export default SharedPage;
