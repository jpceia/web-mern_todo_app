import axios from "axios";
import { BACKEND_URL } from "../constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { expenseSlice } from "../api/expenseApi";

export const login = () => {
    window.location.href = BACKEND_URL + "/auth/google";
};

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { dispatch, rejectWithValue }) => {
    try {
        console.log("fetchProfile")
        const res = await axios.get(BACKEND_URL + "/api/me", { withCredentials: true })
        const { data } = res
        await dispatch(expenseSlice.endpoints.getExpenses.initiate())
        console.log(expenseSlice.endpoints)
        return data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk("auth/logout", async (_userData, { rejectWithValue }) => {
    try {
        console.log("logout")
        const res = await axios.get(BACKEND_URL + "/auth/logout", { withCredentials: true });
        
        const { data } = res
        return data

    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

const initialState = {
    profile: null,
    loading: true,
    error: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfile.pending]: (state, _action) => {
            state.loading = true
            state.error = null
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.profile = action.payload
            state.loading = false
            state.error = null
        },
        [fetchProfile.rejected]: (state, action) => {
            console.log("fetchProfile.rejected", action)
            state.profile = null
            state.loading = false
            state.error = action.payload
        },
        [logout.fulfilled]: (state, _action) => {
            state.profile = null
            state.loading = false
            state.error = null
        },
        [logout.rejected]: (state, action) => {
            console.log("logout.rejected", action)
            state.profile = null
            state.loading = false
            state.error = action.payload
        }
    }
})

export const selectProfile = state => state.auth.profile;
export default authSlice.reducer;
