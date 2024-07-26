import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from './components/Providers';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>
  );
}
