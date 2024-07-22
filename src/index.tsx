import React from 'react';
import ReactDOM from 'react-dom/client';
import '@drewbot/sass-flexbox-grid/public/sass-flexbox/scss/main.scss';
import './styles/main.scss';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
