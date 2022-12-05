import React from 'react';
import styled from 'styled-components';
import siteLogoIcon from '../assets/logo.svg';
import debugImage from '../assets/background-1.svg';
import talkingImage from '../assets/background-2.svg';
import { LoginButton } from '../components/loginButton';
const LandingPage = () => {
  return (
    <PageWrapper>
      <SiteLogo>
        <img src={siteLogoIcon} alt="사이트 로고 아이콘" />
        <span>codocs</span>
      </SiteLogo>
      <ContentBox>
        <Title>귀찮은 공동 문서 작업, Codocs에서 한번에.</Title>
        <LoginButton />
      </ContentBox>
      <DebugImage src={debugImage} alt="디버깅하고 있는 사람" />
      <TalkingImage src={talkingImage} alt="이야기하고 있는 사람들" />
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

  gap: 2.5rem;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 4rem;
  line-height: 4.8125rem;
  letter-spacing: -0.04em;
  color: #222222;
`;

const DebugImage = styled.img`
  position: absolute;
  width: 30vw;
  height: 30vh;
  right: 0;
  top: 0;
`;

const TalkingImage = styled.img`
  position: absolute;
  width: 30vw;
  height: 30vh;
  left: 0;
  bottom: 100px;
`;

export default LandingPage;
