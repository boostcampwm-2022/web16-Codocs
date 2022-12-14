import React, { useCallback } from 'react';
import styled from 'styled-components';
import { DocListItem } from '../docListItem';
import { fetchDataFromPath } from '../../utils/fetchBeforeRender';
import { useQuery } from 'react-query';
import useToast from '../../hooks/useToast';

interface DocListProps {
  documentType: string,
  sortOption: string
}

interface RequestPathMap {
  [key: string]: string
}

// TODO: props 로 API 세부 주소 받기 
const DocList = ({ documentType, sortOption }:DocListProps) => {
  const { alertToast } = useToast();

  const reqPathByDocumentType: RequestPathMap = {
    recent: '/user-document/recent',
    bookmark: '/bookmark',
    shared: '/user-document/shared',
  };

  const { data: docList } = useQuery(`${documentType}`, () => fetchDataFromPath(`${reqPathByDocumentType[documentType]}`), {
    suspense: true,
    onError: e => {
      console.log(e);
    },
  });

  const sortDocListByOption = (prev: DocListItem, next: DocListItem) => {
    // return prev[sortOption] > next[sortOption] ? 1 : -1; 
  };

  const handleDeleteDocument = useCallback(async (id: string) => {
    try {
      // TODO: URL 수정 + response statusCode 조건문 추가
      await fetch(`/document/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      alertToast('INFO', '문서를 성공적으로 삭제했습니다.');     
    } catch (err) {
      alertToast('WARNING', '문서 삭제에 실패했습니다. 다시 시도해주세요.');     
    }
  }, []);

  const handleBookmarkDocument = useCallback(async (id: string) => {
    try {
      // TODO: URL 수정 + response statusCode 조건문 추가
      await fetch(`/bookmark/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      alertToast('INFO', '북마크에 추가했습니다.');     
    } catch (err) {
      alertToast('WARNING', '북마크에 추가하지 못했습니다. 다시 시도해주세요.');     
    }
  }, []);
  
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
            handleBookmark={handleBookmarkDocument}
            handleDelete={handleDeleteDocument}
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
