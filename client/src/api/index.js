import axios from 'axios';

const url = '/api/todos';

export const createTodo = (task) => axios.post(url, task);
export const getTodos = () => axios.get(url);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
