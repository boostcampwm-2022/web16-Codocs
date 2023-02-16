import React from 'react';
import styled, { useTheme } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HouseIcon } from '../../assets/house.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';
import { ReactComponent as TogetherIcon } from '../../assets/together.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { IconButton } from '../iconButton';

const SideBar = () => {
  const theme = useTheme();

  const ICON_STYLES = {
    fill: theme.gray,
    width: '1.5',
    height: '1.5'
  };

  return (
    <SideBarWrapper>
      <NavMenu to="/document/main">
        <IconButton {...ICON_STYLES}>
          <HouseIcon />
        </IconButton>
      </NavMenu>

      <NavMenu to="/document/private">
        <IconButton {...ICON_STYLES}>
          <LockIcon />
        </IconButton>
      </NavMenu>

      <NavMenu to="/document/shared">
        <IconButton {...ICON_STYLES}>
          <TogetherIcon />
        </IconButton>
      </NavMenu>

      <NavMenu to="/document/bookmark">
        <IconButton {...ICON_STYLES}>
          <BookmarkIcon />
        </IconButton>
      </NavMenu>
    </SideBarWrapper>
  );
};

const SideBarWrapper = styled.nav`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.border};
`;

const NavMenu = styled(NavLink)`
  margin: 1rem 0;
  &.active {
    svg {
      fill: ${({ theme }) => theme.interaction};
    }
  }
`;

export { SideBar };
