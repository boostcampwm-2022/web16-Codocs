import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_ACTIVE, COLOR_CAUTION } from '../../constants/styled';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { IconButton } from '../iconButton';
import useToast from '../../hooks/useToast';

const DocListItem = ({ id, title, lastVisited, role, createdAt }: DocListItem) => {
  const { alertToast } = useToast();
  const docListItemStyles = {
    fill: '#A5A5A5',
    width: '0.75',
    height: '0.75'
  };

  const handleDeleteDocument = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // TODO: URL 수정 + response statusCode 조건문 추가
      const response = await fetch(`/document/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      throw Error('강제 에러');
      alertToast('INFO', '문서를 성공적으로 삭제했습니다.');     
    } catch (err) {
      alertToast('WARNING', '문서 삭제에 실패했습니다. 다시 시도해주세요.');     
    }
  };

  const handleBookmarkDocument = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // TODO: URL 수정 + response statusCode 조건문 추가
      const response = await fetch(`/document/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      throw Error('강제 에러');
      alertToast('INFO', '북마크에 추가했습니다.');     
    } catch (err) {
      alertToast('WARNING', '북마크에 추가하지 못했습니다. 다시 시도해주세요.');     
    }
  };

  return (
    <DocListItemWrapper>
      <Link to={`../${id}`}>
        <Title>{title}</Title>
        <LowerLayout>
          <LastVisited>최근 방문일: {lastVisited.slice(0, 11)}</LastVisited>
          <IconGroup>
            <li>
              {role === 'onwer' && (
                <IconButton {...docListItemStyles} hover={COLOR_CAUTION} clickHandler={handleDeleteDocument}>
                  <TrashIcon />
                </IconButton>
              )}
            </li>
            <li>
              <IconButton {...docListItemStyles} hover={COLOR_ACTIVE} clickHandler={handleBookmarkDocument}>
                <BookmarkIcon />
              </IconButton>
            </li>
          </IconGroup>
        </LowerLayout>
      </Link>
    </DocListItemWrapper>
  );
};

const DocListItemWrapper = styled.div`
  width: 15rem;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: #222222;
`;

const LowerLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 1.5rem;
`;

const LastVisited = styled.div`
  font-weight: 300;
  font-size: 10px;
  color: #a5a5a5;
`;

const IconGroup = styled.ul`
  list-style-type: none;
  margin: 0;
  display: flex;
  li {
    margin-left: 0.4rem;
  }
`;

export { DocListItem };
