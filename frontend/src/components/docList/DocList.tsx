import React from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';

interface DocListProps {
  response: { read(): any }
}

const DocList = ({response}: DocListProps) => {
  const docList = response.read();

  return (
    <DocListWrapper>
      {docList.map((doc:DocListItem) => {
        return <DocListItem key={doc.id} id={doc.id} title={doc.title} lastVisited={doc.lastVisited} role={doc.role} />;
      }) }
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