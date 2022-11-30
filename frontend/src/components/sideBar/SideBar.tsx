import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ReactComponent as HouseIcon } from '../../assets/house.svg';
import { ReactComponent as LockIcon } from '../../assets/lock.svg';
import { ReactComponent as TogetherIcon } from '../../assets/together.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { ReactComponent as TrashBagIcon } from '../../assets/trashbag.svg';
import { IconButton } from '../iconButton';

const SideBar = () => {
  const sideBarIconStyles = {
    fill: '#A5A5A5',
    width: '1.5',
    height: '1.5',
  };

  return <SideBarWrapper>
    <NavMenu to="/document/main">
      <IconButton {...sideBarIconStyles}>
        <HouseIcon />
      </IconButton>
    </NavMenu>

    <NavMenu to="/document/private">
      <IconButton {...sideBarIconStyles}>
        <LockIcon />
      </IconButton>
    </NavMenu>

    <NavMenu to="/document/shared">
      <IconButton {...sideBarIconStyles}>
        <TogetherIcon />
      </IconButton>
    </NavMenu>

    <NavMenu to="/document/bookmark">
      <IconButton {...sideBarIconStyles}>
        <BookmarkIcon />
      </IconButton>
    </NavMenu>

    <NavMenu to="/document/trash">
      <IconButton {...sideBarIconStyles}>
        <TrashBagIcon />
      </IconButton>
    </NavMenu>

  </SideBarWrapper>;
};

const SideBarWrapper = styled.nav`
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #BBBBBB;
`;

const NavMenu = styled(NavLink)`
  margin: 1rem 0;
  &.active {
    svg {
      fill: black;
    }
  }
`;

export { SideBar };
