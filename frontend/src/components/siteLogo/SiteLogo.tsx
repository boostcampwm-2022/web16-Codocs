import React from 'react';
import styled, { useTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

const SiteLogo = () => {
  const theme = useTheme();

  return (
    <LogoWrapper to="/document/main">
      <LogoIcon fill={theme.text} />    
      <LogoTitle>Codocs</LogoTitle>
    </LogoWrapper>
  );
};

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const LogoTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

export { SiteLogo };
