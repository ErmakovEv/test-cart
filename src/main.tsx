import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import LogoProvider from './providers/logoProvider/LogoProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LogoProvider>
      <App />
    </LogoProvider>
  </React.StrictMode>
);
