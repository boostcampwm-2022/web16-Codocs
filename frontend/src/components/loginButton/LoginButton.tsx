import React from 'react';
import styled from 'styled-components';
import githubIcon from '../../assets/github.svg';

const LoginButton = () => {
  const handleGithubOAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = process.env.REACT_APP_GITHUB_OAUTH as string;
  };

  return (
    <GithubButton onClick={handleGithubOAuth}>
      <img src={githubIcon} alt="Github 아이콘" />
      <span>Github로 시작하기</span>
    </GithubButton>
  );
};

const GithubButton = styled.button`
  width: 18.75rem;
  height: 5.125rem;

  background: #3a7dff;
  border-radius: 1.25rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9375rem;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  span {
    font-weight: 700;
    font-size: 1.5625rem;
    line-height: 1.875rem;
    text-align: center;
    letter-spacing: -0.04em;

    color: #ffffff;
  }
`;

export { LoginButton };
