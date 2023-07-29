import React, { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import { NumericFormat } from 'react-number-format';
import { useAddExpenseMutation } from '../api/expenseApi';


const FormContainer = styled(Container)`
    background-color: #eee;
    padding: 20px;
    margin-top: 50px;
    border-radius: 5px;
    width: 50%;
`;

const Form = styled.form`
    display: flex;
    flex-flow: column wrap;
`;

// stretch
const FormGroup = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-flow: column wrap;
    align-items: stretch;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    font-size: small;
`;

const Input = styled.input`
    display: block;
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
`;

const TextArea = styled.textarea`
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 5px;
    height: 10em;
    resize: none;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    background-color: #2196f3;
    font-weight: bold;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
`;

const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      border: '2px solid #ccc',
      borderRadius: '5px'
    }),
  };

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
        <FormContainer>
            <h2>New expense</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Payment date</Label>
                    <div>
                        <DatePicker
                            selected={formData.date}
                            onChange={(date) => handleValueChange('date', new Date(date))}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a date"
                            customInput={<Input />}
                        />
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Category</Label>
                    <Select
                        options={categories}
                        value={formData.category}
                        onChange={(option) => handleValueChange('category', option.value)}
                        placeholder="Select a category"
                        styles={customSelectStyles}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Value</Label>
                    <NumericFormat
                        value={formData.value}
                        onValueChange={handleAmountChange}
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale
                        thousandSeparator=" "
                        decimalSeparator="."
                        suffix=" €"
                        customInput={Input}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default ExpenseForm;