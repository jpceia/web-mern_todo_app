import { format } from 'date-fns';
import React, { useState } from 'react';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../api/expenseApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const ExpensesListRow = ({ expense }) => {
    const { id, date, category, value, description } = expense;
    const [ deleteExpense, {
        isLoading: isDeleting
    }] = useDeleteExpenseMutation(id);

    if (isDeleting)
        return (
            <TableRow>
                <TableCell colSpan="5">Deleting...</TableCell>
            </TableRow>
        );
    // format date to "YYYY-MM-DD"
    const paymentDate = format(new Date(date), "dd-MM-yyyy");
    const amount = Intl.NumberFormat(
        'en-US', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 2
        }).format(value);
     
    return (
        <TableRow>
            <TableCell>{paymentDate}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{amount}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell><button onClick={() => deleteExpense(id)}>❌</button></TableCell>
        </TableRow>
    );
}

const ExpensesList = () => {
    const [page, setPage] = useState(1);
    const {
        data: expenses,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetExpensesQuery(page);

    if (isLoading)
        return <div style={{
            textAlign: 'center',
            fontSize: '2em',
            marginTop: '50px'
        }}>Loading...</div>;

    if (isError)
        return <div>{error}</div>;

    if (!isSuccess)
        return null;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Payment date</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amout</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.data.map((expense, index) => (
                        <ExpensesListRow
                            key={index}
                            expense={expense}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExpensesList;
