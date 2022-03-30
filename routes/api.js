import express from 'express';
import Todo from '../models/todo.js';

const routes = express.Router();

routes.get('/todos', (req, res, next) => {
    Todo.find({}, 'action')
        .then((data) => res.json(data))
        .catch(next);
});

routes.post('/todos', (req, res, next) => {
    if (req.body.action)
    {
        Todo.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    }
    else
    {
        res.json({
            error: 'The input field is empty',
        });
    }
});

routes.delete('/todos/:id', (req, res, next) => {
    Todo.findByIdAndRemove({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});

export default routes;
