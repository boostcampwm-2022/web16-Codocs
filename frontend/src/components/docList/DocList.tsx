import React, { useCallback } from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import useToast from '../../hooks/useToast';

const { REACT_APP_API_URL } = process.env;

interface DocListProps {
  documentType: string;
  sortOption: string;
}

interface RequestPathMap {
  [key: string]: string;
}

const DocList = ({ documentType, sortOption }: DocListProps) => {
  const { alertToast } = useToast();
  const reqPathByDocumentType: RequestPathMap = {
    recent: '/user-document/recent',
    private: '/user-document/private',
    shared: '/user-document/shared',
    bookmark: '/bookmark'
  };
  const queryClient = useQueryClient();

  const { data: docList } = useQuery(
    `${documentType}`,
    () => fetchDataFromPath(`${reqPathByDocumentType[documentType]}`),
    {
      cacheTime: 0,
      suspense: true,
      onError: (e) => {
        console.log(e);
      }
    }
  );

  const sortDocListByOption = (prev: DocListItem, next: DocListItem) => {
    // return prev[sortOption] > next[sortOption] ? 1 : -1;
  };

  const deleteMutation = useMutation(
    async (id: string) => {
      return await fetch(`${REACT_APP_API_URL}/document/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${documentType}`);
      }
    }
  );

  const bookmarkMutation = useMutation(
    async (id: string) => {
      return await fetch(`${REACT_APP_API_URL}/bookmark/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${documentType}`);
      }
    }
  );

  // alertToast('INFO', '북마크에 추가했습니다.');
  // alertToast('WARNING', '북마크에 추가하지 못했습니다. 다시 시도해주세요.');

  return (
    <DocListWrapper>
      {docList?.sort(sortDocListByOption).map((doc: DocListItem) => {
        return (
          <DocListItem
            key={doc.id}
            id={doc.id}
            title={doc.title}
            lastVisited={doc.lastVisited}
            role={doc.role}
            createdAt={doc.createdAt}
            handleBookmark={bookmarkMutation.mutate}
            handleDelete={deleteMutation.mutate}
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
