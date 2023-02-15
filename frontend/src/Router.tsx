import React, { lazy, Suspense } from 'react';
import GlobalStyles from './GlobalStyles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Spinner } from './components/spinner';
import { ToastMsg } from './components/toastMsg';
import MainLayout from './pages/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const PrivatePage = lazy(() => import('./pages/PrivatePage'));
const SharedPage = lazy(() => import('./pages/SharedPage'));
const BookmarkPage = lazy(() => import('./pages/BookmarkPage'));
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
            <Route path="private" element={<PrivatePage />} />
            <Route path="shared" element={<SharedPage />} />
            <Route path="bookmark" element={<BookmarkPage />} />
          </Route>
          <Route path="/document/:document_id" element={<DocumentPage />} />
          <Route path="/error" element={<NotFoundPage />} />;
          <Route path="*" element={<Navigate to="/error" replace />} />;
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
