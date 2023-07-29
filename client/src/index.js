import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { expenseSlice } from './api/expenseApi';
import App from './App';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchProfile } from './auth/authSlice';

const container = document.getElementById('root');

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

store.dispatch(expenseSlice.endpoints.getExpenses.initiate());
store.dispatch(fetchProfile());
