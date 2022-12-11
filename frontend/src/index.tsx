import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
const { REACT_APP_NODE_ENV } = process.env;

if (REACT_APP_NODE_ENV === 'mock') {
  import('./mocks/worker').then(({ worker }) => worker.start({
    onUnhandledRequest: 'bypass',
  }));
} 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
