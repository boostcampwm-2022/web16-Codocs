import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className="App">
          <GlobalStyles />
          test
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
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
