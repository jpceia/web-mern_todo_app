import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../constants';


export const expenseSlice = createApi({
    reducerPath: 'expenses',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api/expense` }),
    credentials: 'include',
    tagTypes: ['Expense'],
    endpoints: builder => ({
        getExpenses: builder.query({
            query: () => ({
                url: '/',
                credentials: 'include',
                method: 'GET'
            }),
            providesTags: ['Expense']
        }),
        getExpense: builder.query({
            query: id => `/${id}`
        }),
        addExpense: builder.mutation({
            query: body => ({
                url: '/',
                credentials: 'include',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Expense']
        }),
        deleteExpense: builder.mutation({
            query: id => ({
                url: `/${id}`,
                credentials: 'include',
                method: 'DELETE'
            }),
            invalidatesTags: ['Expense']
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
    useGetExpensesQuery,
    useGetExpenseQuery,
    useAddExpenseMutation,
    useDeleteExpenseMutation
} = expenseSlice
