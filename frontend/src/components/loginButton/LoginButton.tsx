import React from 'react';
import styled from 'styled-components';
import githubIcon from '../../assets/github.svg';

const LoginButton = () => {
  const handleGithubOAuth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = process.env.REACT_APP_GITHUB_OAUTH as string;
  };

  return (
    <GitHubButton onClick={handleGithubOAuth}>
      <img src={githubIcon} alt="Github 아이콘" />
      <span>Github로 시작하기</span>
    </GitHubButton>
  );
};

const GitHubButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 1.25rem 1.5rem;
  border-radius: 1.25rem;
  background: ${({ theme }) => theme.primary};;

  img {
    width: 2.5rem;
    height: 2.5rem;
  }

  span {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.75rem;
    text-align: center;
    letter-spacing: -0.04em;

    color: ${({ theme }) => theme.white};
  }
`;

export { LoginButton };
