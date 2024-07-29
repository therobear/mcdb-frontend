import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster, ToasterProps } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@drewbot/sass-flexbox-grid/public/sass-flexbox/scss/main.scss';
import './styles/main.scss';
import App from './App';

const toastProps: ToasterProps = {
    position: 'top-center',
    reverseOrder: true,
};

const queryClient: QueryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster {...toastProps} />
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);
