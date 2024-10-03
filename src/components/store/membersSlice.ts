import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { MemberData } from '../MemberItem';

import axios from 'axios';

interface MembersRequest {
    page: number;
}

export interface MembersListData {
    data: MemberData[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

export const fetchMembers = createAsyncThunk<MembersListData, MembersRequest, { rejectValue: string }>(
    'membersList/fetchMembers',
    async ({ page }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=8`);
            return response.data as MembersListData;
        } catch (error) {
            return rejectWithValue('Occured error when loading members data!');
        }
    },
);

interface MembersListState {
    members: MembersListData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: MembersListState = {
    members: null,
    isLoading: false,
    error: null,
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default membersSlice.reducer;
