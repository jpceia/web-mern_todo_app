import Todo from '../models/todo.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}, 'action');
        res.status(200).send(todos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(200).send(todo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndRemove({ _id: req.params.id });
        res.status(200).send(todo);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
};
