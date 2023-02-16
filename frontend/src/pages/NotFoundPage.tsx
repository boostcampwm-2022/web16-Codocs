import React from 'react';
import styled from 'styled-components';
import ErrorIcon from '../assets/404.svg';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/', { replace: true });
  };

  return (
    <PageWrapper>
      <ErrorGroup>
        <ErrorCode>404</ErrorCode>
        <ErrorMessage>Page Not Found</ErrorMessage>
        <PageDescription>페이지를 찾을 수 없습니다.</PageDescription>
        <ReplaceButton type="button" onClick={handleGoBack}>
          돌아가기
        </ReplaceButton>
      </ErrorGroup>
      <ErrorImage src={ErrorIcon} alt="실망하는 사람" />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 2rem;
`;

const ErrorGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ErrorCode = styled.strong`
  font-size: 4rem;
  line-height: 5rem;
  color: ${({ theme }) => theme.primary};
`;

const ErrorMessage = styled.strong`
  font-size: 3rem;
  line-height: 4rem;
  color: ${({ theme }) => theme.text};
`;

const PageDescription = styled.span`
  font-size: 2rem;
  line-height: 6rem;
  color: ${({ theme }) => theme.text};
`;

const ErrorImage = styled.img`
  width: 30vw;
`;

const ReplaceButton = styled.button`
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 20px;
  padding: 1rem 3rem;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.primary};
`;

export default NotFoundPage;
