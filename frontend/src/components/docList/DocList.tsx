import React from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';
import useGetDocumentQuery from '../../query/document/useGetDocumentQuery';
import useDeleteDocumentMutation from '../../query/document/useDeleteDocumentMutation';
import useAddDocumentBookmarkMutation from '../../query/document/useAddDocumentBookmarkMutation';
import useRemoveDocumentBookmarkMutation from '../../query/document/useRemoveDocumentBookmarkMutation';

interface DocListProps {
  documentType: string;
  sortOption: string;
}

const DocList = ({ documentType, sortOption }: DocListProps) => {
  const { mutate: deleteMutate } = useDeleteDocumentMutation(documentType);
  const { mutate: bookmarkMutate } = useAddDocumentBookmarkMutation(documentType);
  const { mutate: unbookmarkMutate } = useRemoveDocumentBookmarkMutation(documentType);
  const { data: docList } = useGetDocumentQuery(documentType);

  const sortDocListByOption = (prev: DocListItem, next: DocListItem) => {
    if (sortOption === 'title') {
      return prev[sortOption] > next[sortOption] ? 1 : -1;
    }

    if (sortOption === 'createdAt') {
      return new Date(prev[sortOption]) > new Date(next[sortOption]) ? 1 : -1;
    }

    if (sortOption === 'lastVisited') {
      return new Date(prev[sortOption]) < new Date(next[sortOption]) ? 1 : -1;
    }
  };

  return (
    <DocListWrapper>
      {docList?.sort(sortDocListByOption).map((doc: DocListItem) =>
        (
          <DocListItem
            key={doc.id}
            bookmarkMutate={bookmarkMutate}
            unbookmarkMutate={unbookmarkMutate}
            deleteMutate={deleteMutate}
            {...doc}
          />
        )
      )}
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
