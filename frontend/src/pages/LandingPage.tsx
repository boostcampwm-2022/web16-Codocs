import React from 'react';
import styled from 'styled-components';
import SiteLogoIcon from '../assets/logo.svg';
const LandingPage = () => {
  return (
    <PageWrapper>
      <SiteLogo>
        <img src={SiteLogoIcon} alt="사이트 로고 아이콘" />
        <span>codocs</span>
      </SiteLogo>
      <ContentBox>
        <Title>귀찮은 공동 문서 작업, Codocs에서 한번에.</Title>
      </ContentBox>
    </PageWrapper>
  );
};

const SiteLogo = styled.div`
  position: absolute;
  left: 30px;
  top: 21px;
  display: flex;
  align-items: center;
  gap: 0.625rem;

  img {
    width: 2.125rem;
    height: 2.5rem;
  }

  span {
    font-weight: 700;
    font-size: 2.8125rem;
    line-height: 3.375rem;
    letter-spacing: -0.04em;

    color: #222222;
  }
`;

const PageWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #fefeff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 4rem;
  line-height: 4.8125rem;
  letter-spacing: -0.04em;

  color: #222222;
`;

export default LandingPage;
