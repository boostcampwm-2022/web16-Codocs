import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
