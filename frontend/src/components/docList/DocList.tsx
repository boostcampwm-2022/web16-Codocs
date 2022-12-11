import React from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';
import { useQuery } from 'react-query';

const DocList = () => {
  const { data: docList } = useQuery('docList', () => fetchDataFromPath('/user-document/recent'), {
    refetchOnWindowFocus: false,
    onError: e => {
      console.log(e);
    },
    suspense: true,
  });

  return (
      <DocListWrapper>
        {docList?.map((doc: DocListItem) => {
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
        })}
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
