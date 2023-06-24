import { Router } from 'express';
import { createTodo, getTodos, deleteTodo } from '../controllers/todos.js';

const routes = Router();
routes.get('/', getTodos);
routes.post('/', createTodo);
routes.delete('/:id', deleteTodo);

export default routes;
