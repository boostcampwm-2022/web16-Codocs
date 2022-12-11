import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if (process.env.NODE_ENV === 'test') {
  import('./mocks/worker').then(({ worker }) => worker.start());
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
