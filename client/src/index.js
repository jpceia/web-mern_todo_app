import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { apiSlice } from './api/apiSlice';
import App from './App';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');

store.dispatch(apiSlice.endpoints.getExpenses.initiate());

// Initial render
createRoot(container).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
store.dispatch(fetchProfile());
