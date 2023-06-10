import { AppDataSource } from "../datasource.js";
import Todo from "../entities/todo.js";


export const getTodos = async (req, res) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    try {
        const todos = await todoRepository.find();
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

export const createTodo = async (req, res) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    try {
        const action = req.body.action;
        if (!action)
            throw new Error("Action is required");
        const body = {
            action,
            date: new Date()
        }
        const todo = await todoRepository.save(body);
        res.status(200).send(todo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteTodo = async (req, res) => {
    const todoRepository = AppDataSource.getRepository(Todo);
    try {
        const todo = await todoRepository.delete(req.params.id);
        res.status(200).send(todo);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
};
