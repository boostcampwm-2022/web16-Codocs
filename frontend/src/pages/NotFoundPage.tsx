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
      <ErrorImage src={ErrorIcon} alt="실망하는 사람" />
      <PageContent>
        <ErrorCode>404</ErrorCode>
        <ErrorMessage>Page Not Found</ErrorMessage>
        <PageDescription>페이지를 찾을 수 없습니다.</PageDescription>
        <ReplaceButton type="button" onClick={handleGoBack}>
          돌아가기
        </ReplaceButton>
      </PageContent>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ErrorCode = styled.strong`
  font-size: 10rem;
  line-height: 10rem;
  text-align: center;

  color: #3a7dff;
`;

const ErrorMessage = styled.strong`
  font-size: 3rem;
  line-height: 3rem;
  text-align: center;

  color: #222222;
`;

const PageDescription = styled.span`
  font-weight: 300;
  font-size: 2rem;
  line-height: 4rem;
  text-align: center;

  color: #222222;
`;

const ErrorImage = styled.img`
  width: 600px;
  height: 600px;
`;

const ReplaceButton = styled.button`
  padding: 1rem 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #3a7dff;
  border-radius: 20px;

  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: center;
  letter-spacing: -0.04em;

  color: #ffffff;
`;

export default NotFoundPage;
