import React from 'react';
import styled from 'styled-components';
import debugImage from '../assets/background-1.svg';
import talkingImage from '../assets/background-2.svg';
import { LoginButton } from '../components/loginButton';
import { SiteLogo } from '../components/siteLogo';
import { devices } from '../constants/breakpoints';

const LandingPage = () => {
  return (
    <PageWrapper>
      <LogoWrapper>
        <SiteLogo />
      </LogoWrapper>
      <DebugImage src={debugImage} alt="디버깅하고 있는 사람" />
      <Title>귀찮은 공동 문서 작업, Codocs에서 한번에.</Title>
      <LoginButton />
      <TalkingImage src={talkingImage} alt="이야기하고 있는 사람들" />
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

  @media ${devices.mobile} {
    justify-content: space-between;
    padding: 1rem;
  }
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
  pointer-events: none;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 4rem;
  align-self: center;
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};

  @media ${devices.mobile} {
    font-size: 2.25rem;
    text-align: center;
    padding: 0;
  }
`;

const DebugImage = styled.img`
  display: block;
  width: 30vw;
  height: 30vh;
  align-self: flex-end;

  @media ${devices.mobile} {
    width: auto;
    height: 25vh;
  }
`;

const TalkingImage = styled.img`
  display: block;
  width: 30vw;
  height: 30vh;
  align-self: flex-start;

  @media ${devices.mobile} {
    width: auto;
    height: 25vh;
  }
`;

export default LandingPage;
