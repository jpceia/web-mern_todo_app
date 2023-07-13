import React from 'react';
import styled from 'styled-components';

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

const ExpensesList = ({ expenses }) => {
    return (
        <Table>
            <thead>
                <tr>
                    <TableHeader>Payment date</TableHeader>
                    <TableHeader>Category</TableHeader>
                    <TableHeader>Amout</TableHeader>
                    <TableHeader>Description</TableHeader>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense, index) => {
                    const { paymentDate, category, amount, description } = expense;
                    return (
                        <TableRow key={index} isEven={index % 2 === 0}>
                            <TableData>{paymentDate}</TableData>
                            <TableData>{category}</TableData>
                            <TableData>{amount}</TableData>
                            <TableData>{description}</TableData>
                        </TableRow>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default ExpensesList;
