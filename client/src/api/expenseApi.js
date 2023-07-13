import axios from 'axios';

const url = '/api/expenses';

export const createExpense = (data) => axios.post(url, data);
export const getExpenses = () => axios.get(url);
export const deleteExpense = (id) => axios.delete(`${url}/${id}`);
