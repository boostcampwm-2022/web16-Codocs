import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLOR_ACTIVE, COLOR_CAUTION } from '../../constants/styled';
import { ReactComponent as TrashIcon } from '../../assets/trash.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { IconButton } from '../iconButton';
import { useRecoilState } from 'recoil';
import { modalState } from '../../atoms/modalAtom';

interface DocListItemWithClickHandler extends DocListItem {
  handleBookmark: (id: string) => void;
  handleUnbookmark: (id: string) => void;
  handleDelete: (id: string) => void;
}

const DocListItem = ({
  id,
  title,
  lastVisited,
  role,
  createdAt,
  isBookmarked,
  handleBookmark,
  handleUnbookmark,
  handleDelete
}: DocListItemWithClickHandler) => {
  const [modalData, setModalData] = useRecoilState(modalState);
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
          <DateInfo>
            <DateText>최근 방문일: {lastVisited.slice(0, 10)}</DateText>
            <DateText>문서 생성일: {createdAt.slice(0, 10)}</DateText>
          </DateInfo>
          <IconGroup>
            <li>
              {role === 'owner' && (
                <IconButton
                  {...docListItemStyles}
                  hover={COLOR_CAUTION}
                  clickHandler={(e) => {
                    e.preventDefault();
                    setModalData({
                      type: 'DELETE',
                      clickHandler: () => {
                        handleDelete(id);
                      }
                    });
                  }}>
                  <TrashIcon />
                </IconButton>
              )}
            </li>
            <li>
              <IconButton
                {...docListItemStyles}
                fill={isBookmarked ? '#3a7dff' : '#A5A5A5'}
                hover={COLOR_ACTIVE}
                clickHandler={(e) => {
                  e.preventDefault();
                  if (!isBookmarked) {
                    setModalData({
                      type: 'BOOKMARK',
                      clickHandler: () => {
                        handleBookmark(id);
                      }
                    });
                    return;
                  }
                  setModalData({
                    type: 'UNBOOKMARK',
                    clickHandler: () => {
                      handleUnbookmark(id);
                    }
                  });
                }}>
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
  align-items: center;
  padding-top: 0.5rem;
`;

const DateInfo = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const DateText = styled.li`
  font-weight: 300;
  font-size: 10px;
  color: #a5a5a5;
  margin-top: 0.25rem;
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
