import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './context/appContext'; // Import your context provider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider> {/* Wrap your App component with the context provider */}
      <App />
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
