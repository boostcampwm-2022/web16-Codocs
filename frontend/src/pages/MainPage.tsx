import React from 'react';
import styled from 'styled-components';
import { DocListContainer } from '../components/docListContainer';
import { ReactComponent as PencilIcon } from '../../src/assets/pencil.svg';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  const handleCreateNewDocument = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/document/new');
      const newDocumentId = await response.json();
      navigate(`../${newDocumentId}`);
    } catch (err) {
      alert('새로운 문서 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ContentWrapper>
      <NewDocBtn onClick={handleCreateNewDocument}>
        <PencilIcon />
        <BtnText>새로운 문서 작성</BtnText>
      </NewDocBtn>
      <ContentHeaderGroup>
        <Title>최근 문서 목록</Title>
        <div>드롭다운</div>
        {/* TODO: <Dropdown /> */}
      </ContentHeaderGroup>
      <DocListContainer />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.section`
  flex: 1;
  margin: 3rem 3.5rem;
  overflow-y: scroll;
`;

const ContentHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2rem;
`;

const NewDocBtn = styled.button`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #3A7DFF;
  background-color: #3A7DFF;
  padding: 1.25rem 2rem 1.25rem 1.5rem;
  margin-bottom: 2rem;
  svg {
    fill: #fff;
  }
  &:hover {
    span {
      color: #3A7DFF;
    }
    svg {
      fill: #3A7DFF;
    }
    background-color: #FFFFFF;
  }
`;
  
const BtnText = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: #FFFFFF;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
`;

export default MainPage;
