import React from 'react';
import styled from 'styled-components';
import { Header } from '../components/header';
import { SideBar } from '../components/sideBar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Container>
        <SideBar />
        <Outlet />
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
`;

export default MainLayout;

