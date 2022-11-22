import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {ReactComponent as HouseIcon} from '../../assets/house.svg';
import {ReactComponent as LockIcon} from '../../assets/lock.svg';
import {ReactComponent as TogetherIcon} from '../../assets/together.svg';
import {ReactComponent as BookmarkIcon} from '../../assets/bookmark.svg';
import {ReactComponent as TrashBagIcon} from '../../assets/trashbag.svg';

const SideBar = () => {
  return <SideBarWrapper>
    <NavIcon to="/main">
      <HouseIcon />
    </NavIcon>
    <NavIcon to="/private">
      <LockIcon />
    </NavIcon>
    <NavIcon to="/shared">
      <TogetherIcon />
    </NavIcon>
    <NavIcon to="/bookmark">
      <BookmarkIcon />
    </NavIcon>
    <NavIcon to="/trash">
      <TrashBagIcon />
    </NavIcon>
  </SideBarWrapper>;
};

const SideBarWrapper = styled.nav`
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #BBBBBB;
`;

const NavIcon = styled(NavLink)`
  margin: 1rem 0;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: #A5A5A5;
  }
  &:hover {
    svg {
      fill: black;
    }
  }
  &.active {
    svg {
      fill: black;
    }
  }
`;

export { SideBar };
