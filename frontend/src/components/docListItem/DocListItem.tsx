import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_ACTIVE, COLOR_CAUTION } from '../../constants/styled';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { IconButton } from '../iconButton';

const DocListItem = ({ id, title, lastVisited, role, createdAt }: DocListItem) => {
  const docListItemStyles = {
    fill: '#A5A5A5',
    width: '0.75',
    height: '0.75'
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
                <IconButton {...docListItemStyles} hover={COLOR_CAUTION}>
                  <TrashIcon />
                </IconButton>
              )}
            </li>
            <li>
              <IconButton {...docListItemStyles} hover={COLOR_ACTIVE}>
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
  display: flex;
  li {
    margin-left: 0.4rem;
  }
`;

export { DocListItem };
