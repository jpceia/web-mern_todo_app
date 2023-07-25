import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BACKEND_URL } from '../constants';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_URL}/api` }),
    credentials: 'include',
    tagTypes: ['Expense'],
    endpoints: builder => ({
        getExpenses: builder.query({
            query: () => ({
                url: '/expense',
                credentials: 'include',
                method: 'GET'
            }),
            providesTags: ['Expense']
        }),
        getExpense: builder.query({
            query: id => `/expense/${id}`
        }),
        addExpense: builder.mutation({
            query: body => ({
                url: '/expense',
                credentials: 'include',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Expense']
        }),
        deleteExpense: builder.mutation({
            query: id => ({
                url: `/expense/${id}`,
                credentials: 'include',
                method: 'DELETE'
            }),
            invalidatesTags: ['Expense']
        }),
        getMe: builder.query({
            query: () => '/me',
            providesTags: ['Me']
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
    useGetExpensesQuery,
    useGetExpenseQuery,
    useAddExpenseMutation,
    useDeleteExpenseMutation,
    useGetMeQuery
} = apiSlice
