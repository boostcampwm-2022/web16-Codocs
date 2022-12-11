import React, { lazy, Suspense } from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/spinner';
import { ToastMsg } from './components/toastMsg';
import MainLayout from './pages/MainLayout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ToastMsg />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/document" element={<MainLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="private" element="" />
            <Route path="shared" element="" />
            <Route path="bookmark" element="" />
            <Route path="trash" element="" />
          </Route>
          <Route path="/document/:document_id" element={<DocumentPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
