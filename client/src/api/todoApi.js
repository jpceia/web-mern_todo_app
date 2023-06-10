import axios from 'axios';

const url = '/api/todos';

export const createTodo = (data) => axios.post(url, data);
export const getTodos = () => axios.get(url);
export const deleteTodo = (id) => axios.delete(`${url}/${id}`);
