import React from 'react';
import styled from 'styled-components';
import { SideBar } from '../components/sideBar';
import { DocListContainer } from '../components/docListContainer';

const MainPage = () => {
  return (
    <>
      {/* TODO: <Header /> */}
      <Container>
        <SideBar />
        <ContentWrapper>
          <ContentHeaderGroup>
            <Title>최근 문서 목록</Title>
            <div>드롭다운</div>
            {/* TODO: <Dropdown /> */}
          </ContentHeaderGroup>
          <DocListContainer />
        </ContentWrapper>
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
`;

const ContentWrapper = styled.section`
  flex: 1;
  margin: 2rem 3.5rem;
  overflow-y: scroll;
`;

const ContentHeaderGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2rem;
`;
  
export default MainPage;