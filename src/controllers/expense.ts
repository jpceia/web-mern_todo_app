import { AppDataSource } from "../datasource";
import { Expense } from "../entities/expense";


export const getExpenses = async (req, res) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const expenses = await expenseRepository.findBy({ userId: req.user.id });
        res.status(200).send(expenses);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};

export const getExpense = async (req, res) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const expense = await expenseRepository.findOneOrFail({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });
        res.status(200).send(expense);
    }
    catch (error) {
        res.status(404).send("Could not find expense");
    }
};

export const createExpense = async (req, res) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const value = req.body.value;
        if (!value)
            throw new Error("value is required");
        const category = req.body.category;
        if (!category)
            throw new Error("category is required");
        const description = req.body.description;
        const date = req.body.date ? new Date(req.body.date) : new Date();
        const body = {
            userId: req.user.id,
            date,
            category,
            value,
            description,
        }
        const todo = await expenseRepository.save(body);
        res.status(200).send(todo);
    }
    catch (error) {
        res.status(400).send("Could not create expense");
    }
};

export const deleteExpense = async (req, res) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const expense = await expenseRepository.delete({
            id: req.params.id,
            userId: req.user.id
        });
        res.status(200).send(expense);
    }
    catch (error) {
        res.status(404).send("Could not find expense");
    }
};
