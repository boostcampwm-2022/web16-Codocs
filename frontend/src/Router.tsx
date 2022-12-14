import React, { lazy, Suspense } from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/spinner';
import { ToastMsg } from './components/toastMsg';
import { Modal } from './components/modal';
import MainLayout from './pages/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const PrivatePage = lazy(() => import('./pages/PrivatePage'));
const SharedPage = lazy(() => import('./pages/SharedPage'));
const DocumentPage = lazy(() => import('./pages/DocumentPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <ToastMsg />
      <Modal />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/document" element={<MainLayout />}>
            <Route path="main" element={<MainPage />} />
            <Route path="private" element={<PrivatePage />} />
            <Route path="shared" element={<SharedPage />} />
            <Route path="bookmark" element="" />
          </Route>
          <Route path="/document/:document_id" element={<DocumentPage />} />
          <Route path="/*" element={<NotFoundPage />} />;
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
