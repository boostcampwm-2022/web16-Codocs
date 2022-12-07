import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import siteLogoIcon from '../../assets/logo.svg';

const SiteLogo = () => {
  return (
    <LogoWrapper to="/document/main">
      <LogoImg src={siteLogoIcon} alt="사이트 로고 아이콘" />
      <LogoTitle>codocs</LogoTitle>
    </LogoWrapper>
  );
};

const LogoWrapper = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const LogoTitle = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem;
`;

export { SiteLogo };
