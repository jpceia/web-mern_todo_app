import axios from "axios";
import { BACKEND_URL } from "../constants";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";

export const login = () => {
    window.location.href = BACKEND_URL + "/auth/google";
};

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_userData, { rejectWithValue }) => {
    try {
        console.log("fetchProfile")
        const res = await axios.get(BACKEND_URL + "/api/me", { withCredentials: true })
        
        const { data } = res
        return data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const logout = createAsyncThunk("auth/logout", async () => {
    await axios.get(BACKEND_URL + "/auth/logout", { withCredentials: true })
})

const initialState = {
    profile: null,
    loading: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProfile.pending]: (state, _action) => {
            console.log("fetchProfile.pending")
            state.loading = true
        },
        [fetchProfile.fulfilled]: (state, action) => {
            console.log("fetchProfile.fulfilled")
            state.profile = action.payload
            state.loading = false
        },
        [fetchProfile.rejected]: (state, _action) => {
            console.log("fetchProfile.rejected", _action)
            state.profile = null
            state.loading = false
        },
        [logout.pending]: (state, _action) => {
            console.log("logout.pending")
            state = { ...initialState }
        }
    }
})

export const selectProfile = state => state.auth.profile;
export default authSlice.reducer;
