import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import trashIcon from '../../assets/trash.svg';
import bookmarkIcon from '../../assets/bookmark.svg';
import { FILTER_TO_CAUTION, FILTER_TO_ACTIVE } from '../../constants/styled';


const DocListItem = ({id, title, lastVisited, role}: DocListItem) => {
  return (
    <DocListItemWrapper>
      <Link to={id}>
        <Title>{title}</Title>
        <LowerLayout>
          <LastVisited>최근 방문일: {lastVisited}</LastVisited>
          <div>
            {role === 'onwer' && <button>
              <ImgOnBtn color={FILTER_TO_CAUTION} src={trashIcon} alt="삭제하기 버튼" />
            </button>}
            <button>
              <ImgOnBtn color={FILTER_TO_ACTIVE} src={bookmarkIcon} alt="즐겨찾기 버튼" />
            </button>
          </div>
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
  padding-top: 1.5rem;
`;

const LastVisited = styled.div`
  font-weight: 300;
  font-size: 10px;
  color: #A5A5A5;
`;

const ImgOnBtn = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  margin-left: 0.5rem;
  &:hover {
    filter: ${props => props.color};
  }
`;

export { DocListItem };