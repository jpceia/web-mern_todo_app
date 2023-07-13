import React from 'react';
import { 
    selectExpenses,
    deleteExpense
} from '../reducers/expensesReducer';
import ExpenseItem from './ExpenseItem';
import { useDispatch, useSelector } from 'react-redux';

const ListTodo = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpenses);

    if (!expenses || expenses.length === 0)
    {
        return (
            <>
                <br />
                <p>You finish all your tasks. Enjoy your free time 😁</p>
            </>
        );
    }

    return (
        <ul> {
            expenses.map((e) => {
                return <ExpenseItem
                    expense={e}
                    key={expenses.id}
                    onDelete = {() => dispatch(deleteExpense(e.id))}
                />
            })}
        </ul>
    );
};

export default ListTodo;