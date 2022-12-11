import React from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';
import { useQuery } from 'react-query';

interface DocListProps {
  sortOption: string
}

const DocList = ({ sortOption }:DocListProps) => {
  const { data: docList } = useQuery('docList', () => fetchDataFromPath('/user-document/recent'), {
    refetchOnWindowFocus: false,
    suspense: true,
    onError: e => {
      console.log(e);
    },
  });

  const sortDocListByOption = (prev: DocListItem, next: DocListItem) => {
    return prev[sortOption] > next[sortOption] ? 1 : -1; 
  };
  
  return (
      <DocListWrapper>
        {
          docList?.sort(sortDocListByOption).map((doc: DocListItem) => {
            return (
              <DocListItem
                key={doc.id}
                id={doc.id}
                title={doc.title}
                lastVisited={doc.lastVisited}
                role={doc.role}
                createdAt={doc.createdAt}
              />
            );
          })
        }
      </DocListWrapper>
  );
};

const DocListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, 240px);
  gap: 3rem 4.5rem;
  justify-content: space-evenly;
  margin-bottom: 2rem;
`;

export { DocList };
