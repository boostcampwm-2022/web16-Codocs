import React from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route path="/" element="" />
        <Route path="/document" element="">
          <Route element="">
            <Route path="main" element="" />
            <Route path="private" element="" />
            <Route path="shared" element="" />
            <Route path="bookmark" element="" />
            <Route path="trash" element="" />
          </Route>
          <Route path="/document/:document_id" element="" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
