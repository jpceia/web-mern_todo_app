import { format } from 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../api/apiSlice';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background-color: #888;
    color: #ffffff;
`;

const TableData = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
    background-color: ${(props) => (props.isEven ? '#ddd' : '#ffffff')};
`;

const ExpensesListRow = ({ expense, isEven }) => {
    const { id, date, category, value, description } = expense;
    const [ deleteExpense, {
        isLoading: isDeleting
    }] = useDeleteExpenseMutation(id);

    if (isDeleting)
        return (
            <TableRow isEven={isEven}>
                <TableData colSpan="5">Deleting...</TableData>
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
        <TableRow isEven={isEven}>
            <TableData>{paymentDate}</TableData>
            <TableData>{category}</TableData>
            <TableData>{amount}</TableData>
            <TableData>{description}</TableData>
            <TableData><button onClick={() => deleteExpense(id)}>❌</button></TableData>
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
        <Table>
            <thead>
                <tr>
                    <TableHeader>Payment date</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Amout</TableHeader>
                    <TableHeader>Description</TableHeader>
                    <TableHeader></TableHeader>
                </tr>
            </thead>
            <tbody>
                {expenses.data.map((expense, index) => (
                    <ExpensesListRow
                        key={index}
                        expense={expense}
                        isEven={index % 2 === 0}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default ExpensesList;
