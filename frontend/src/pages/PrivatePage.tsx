import React, { Suspense } from 'react';
import styled from 'styled-components';
import usePageName from '../hooks/usePageName';
import useSortOption from '../hooks/useSortOption';
import { DocList } from '../components/docList';
import { Spinner } from '../components/spinner';
import { Dropdown } from '../components/dropdown';
import { devices } from '../constants/breakpoints';

const PrivatePage = () => {
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
        <DocList documentType={'private'} sortOption={option} />
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

  @media ${devices.mobile} {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ContentHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media ${devices.mobile} {
    margin-top: 2rem;
  }
`;

const PageName = styled.h1`
  font-weight: 800;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};

  @media ${devices.mobile} {
    display: none;
  }
`;

export default PrivatePage;
