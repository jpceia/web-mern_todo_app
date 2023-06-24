import { Router } from 'express';
import { createExpense, getExpenses, getExpense, deleteExpense } from '../controllers/expense.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const routes = Router();
routes.get('/', isAuthenticated, getExpenses);
routes.get('/:id', isAuthenticated, getExpense);
routes.post('/', isAuthenticated, createExpense);
routes.delete('/:id', isAuthenticated, deleteExpense);

export default routes;
