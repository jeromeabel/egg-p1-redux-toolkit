import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { api } from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider api={api}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
