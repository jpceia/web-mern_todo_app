import { Request, Response } from "express";
import { AppDataSource } from "../datasource";
import { Expense } from "../entities/expense";
import { User } from "../entities/user";


export const getExpenses = async (req: Request, res: Response) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const user = req.user as User;
        const expenses = await expenseRepository.findBy({ userId: user.id });
        res.status(200).send(expenses);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
};


interface IGetExpenseRequest extends Request  {
    params: {
        id: string;
    }
  }

export const getExpense = async (req: IGetExpenseRequest, res: Response) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const user = req.user as User;
        const expense = await expenseRepository.findOneOrFail({
            where: {
                id: req.params.id,
                userId: user.id
            }
        });
        res.status(200).send(expense);
    }
    catch (error) {
        res.status(404).send("Could not find expense");
    }
};

interface ICreateExpenseRequest extends Request {
    body: {
        value: number;
        category: string;
        description?: string;
        date?: string;
    }
}

export const createExpense = async (req: ICreateExpenseRequest, res: Response) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    try {
        const user = req.user as User;
        const value = req.body.value;
        if (!value)
            throw new Error("value is required");
        const category = req.body.category;
        if (!category)
            throw new Error("category is required");
        const description = req.body.description;
        const date = req.body.date ? new Date(req.body.date) : new Date();
        const body = {
            userId: user.id,
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

interface IDeleteExpenseRequest extends Request {
    params: {
        id: string;
    }
}

export const deleteExpense = async (req: IDeleteExpenseRequest, res: Response) => {
    const expenseRepository = AppDataSource.getRepository(Expense);
    const user = req.user as User;
    try {
        const expense = await expenseRepository.delete({
            id: req.params.id,
            userId: user.id
        });
        res.status(200).send(expense);
    }
    catch (error) {
        res.status(404).send("Could not find expense");
    }
};
