import React from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DocumentPage from './pages/DocumentPage';
import LandingPage from './pages/LandingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/document">
          <Route path="main" element="" />
          <Route path="private" element="" />
          <Route path="shared" element="" />
          <Route path="bookmark" element="" />
          <Route path="trash" element="" />
          <Route path=":document_id" element={<DocumentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
