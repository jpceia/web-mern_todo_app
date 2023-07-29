import React, { useState } from 'react';
import { useDeleteExpenseMutation, useGetExpensesQuery } from '../api/expenseApi';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Paper } from '@mui/material';

const DeleteItem = (id) => {
    const [ deleteExpense ] = useDeleteExpenseMutation(id);
                
    return [<GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={deleteExpense}
    />]
}


const ExpensesList = () => {
    const [page, _] = useState(1);
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

    const columns = [
        {
            field: 'date',
            headerName: 'Payment Date',
            type: 'date',
            width: 150,
            editable: true,
            valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 150,
            editable: true,
        },
        {
            field: 'value',
            headerName: 'Amount',
            type: 'currency',
            width: 130,
            editable: true,
            valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            width: 200,
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 120, // Adjust the width as needed
            renderCell: ({ id }) => <DeleteItem id={id} />,
        },
    ];

    return (
        <div style={{ width: '100%', height: 400, display: 'flex', justifyContent: 'center' }}>
            <Paper style={{ width: '90%' }}>
                <DataGrid
                    rows={expenses.data}
                    loading={isLoading}
                    columns={columns}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </Paper>
        </div>
    );
};

export default ExpensesList;
