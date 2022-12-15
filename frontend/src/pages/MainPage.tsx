import React, { Suspense } from 'react';
import styled from 'styled-components';
import { ReactComponent as PencilIcon } from '../../src/assets/pencil.svg';
import { useNavigate } from 'react-router-dom';
import usePageName from '../hooks/usePageName';
import useToast from '../hooks/useToast';
import { DocList } from '../components/docList';
import { Spinner } from '../components/spinner';
const { REACT_APP_API_URL } = process.env;

const MainPage = () => {
  const { pageName } = usePageName();
  const { alertToast } = useToast();
  const navigate = useNavigate();

  const handleCreateNewDocument = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${REACT_APP_API_URL}/document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const { id: newDocumentId } = await response.json();
      navigate(`../${newDocumentId}`);
    } catch (err) {
      alertToast('WARNING', '새로운 문서 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <ContentWrapper>
      <NewDocBtn onClick={handleCreateNewDocument}>
        <PencilIcon />
        <BtnText>새로운 문서 작성</BtnText>
      </NewDocBtn>
      <ContentHeaderGroup>
        <PageName>{pageName}</PageName>
      </ContentHeaderGroup>
      <Suspense fallback={<Spinner />}>
        <DocList documentType={'recent'} sortOption={'lastVisited'} />
      </Suspense>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.section`
  flex: 1;
  margin: 3rem 3.5rem;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageName = styled.h1`
  font-weight: 800;
  font-size: 2rem;
`;

const NewDocBtn = styled.button`
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #3a7dff;
  background-color: #3a7dff;
  padding: 1.25rem 2rem 1.25rem 1.5rem;
  margin-bottom: 2rem;
  svg {
    fill: #fff;
  }
  &:hover {
    span {
      color: #3a7dff;
    }
    svg {
      fill: #3a7dff;
    }
    background-color: #ffffff;
  }
`;

const BtnText = styled.span`
  font-weight: 500;
  font-size: 20px;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-left: 0.5rem;
`;

export default MainPage;
