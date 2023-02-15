import React, { Suspense } from 'react';
import styled from 'styled-components';
import usePageName from '../hooks/usePageName';
import useSortOption from '../hooks/useSortOption';
import { DocList } from '../components/docList';
import { Spinner } from '../components/spinner';
import { Dropdown } from '../components/dropdown';

const BookmarkPage = () => {
  const { pageName } = usePageName();
  const {option, optionList, setOption} = useSortOption('lastVisited');
  
  return (
    <ContentWrapper>
      <ContentHeaderGroup>
        <PageName>{pageName}</PageName>
        <Dropdown
          value={option}
          onClick={setOption}
          options={optionList}
        />
      </ContentHeaderGroup>
      <Suspense fallback={<Spinner />}>
        <DocList documentType={'bookmark'} sortOption={option} />
      </Suspense>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.section`
  flex: 1;
  margin: 3rem 3.5rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

export default BookmarkPage;
