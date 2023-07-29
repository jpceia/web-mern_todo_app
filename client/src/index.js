import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchProfile } from './auth/authSlice';
import '@mui/material/styles'; // Import Material-UI styles
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const container = document.getElementById('root');

store.dispatch(fetchProfile());

// Initial render
createRoot(container).render(
    <React.StrictMode>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </LocalizationProvider>
        </Provider>
    </React.StrictMode>
);
