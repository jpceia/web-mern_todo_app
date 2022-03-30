import express from 'express';
import { createTodo, getTodos, deleteTodo } from '../controllers/todos.js';

const routes = express.Router();
routes.get('/todos', getTodos);
routes.post('/todos', createTodo);
routes.delete('/todos/:id', deleteTodo);

export default routes;
