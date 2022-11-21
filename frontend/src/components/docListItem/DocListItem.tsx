import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import trashIcon from '../../assets/trash.svg';
import bookmarkIcon from '../../assets/bookmark.svg';

interface docListItemProps  {
  id: string,
  title: string,
  lastVisited: string
  role: string
}

const DocListItem = ({id, title, lastVisited, role}: docListItemProps) => {
  return (
    <Link to={id}>
      <DocListItemWrapper>
        <Title>{title}</Title>
        <LowerLayout>
          <LastVisited>최근 방문일: {lastVisited}</LastVisited>
          <div>
            {role === 'onwer' && <button>
              <ImgOnBtn src={trashIcon} alt="삭제하기 버튼" />
            </button>}
            <button>
              <ImgOnBtn src={bookmarkIcon} alt="즐겨찾기 버튼" />
            </button>
          </div>
        </LowerLayout>
      </DocListItemWrapper>
    </Link>
  );
};

const DocListItemWrapper = styled.div`
  width: 15em;
  height: 4.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75em;
  border: 1px solid #B6B6B6;
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
  padding-top: 1.5em;
`;

const LastVisited = styled.div`
  font-weight: 300;
  font-size: 10px;
  color: #A5A5A5;
`;

const ImgOnBtn = styled.img`
  width: 0.75em;
  height: 0.75em;
  margin-left: 0.5em;
`;

export { DocListItem };