import React, { lazy } from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ToastMsg from './components/toastMsg/ToastMsg';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ToastMsg />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/document">
          <Route path="main" element={<MainPage />} />
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
