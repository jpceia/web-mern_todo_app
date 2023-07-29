import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useAddExpenseMutation } from '../api/expenseApi';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { Grid, Paper, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';


const categories = [
    { value: 'food', label: 'Food' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'utilities', label: 'Utilities' },
];

const emptyFormData = {
    date: null,
    category: null,
    value: '',
    description: '',
}

const ExpenseForm = () => {
    const [formData, setFormData] = useState(emptyFormData);
    const [ addExpense ] = useAddExpenseMutation()

    const handleValueChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        handleValueChange(name, value);
    };

    const handleAmountChange = (values) => {
        const { floatValue } = values;
        handleValueChange('value', floatValue || 0); // Set amount as float or an empty string if invalid
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addExpense(formData);
        setFormData(emptyFormData);
    };

    return (
        <Paper sx={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <Typography
            variant="h4"
            component="h2"
            gutterBottom>
            New Expense
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <DatePicker
                            value={formData.date}
                            onChange={(e) => handleValueChange('date', e.target.value)}
                            label="Payment date"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={formData.category}
                        label="Select a category"
                        onChange={(e) => handleValueChange('category', e.target.value)}
                        variant="outlined"
                    >
                        {categories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                            {category.label}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        value={formData.value}
                        label="Amount"
                        onChange={handleAmountChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]+' }}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                    maxRows={4}
                />
            </FormControl>
            <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ mt: 2 }}>
            Submit
            </Button>
        </form>
      </Paper>
    );
};

export default ExpenseForm;