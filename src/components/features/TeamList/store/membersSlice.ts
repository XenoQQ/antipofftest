import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MembersListData } from '../../../atoms/MembersList/types';
import { MemberData } from '../../../atoms/MemberItem/types';

import axios from 'axios';

interface MembersRequest {
    page: number;
    perPage: number;
}

export const fetchMembers = createAsyncThunk<MembersListData, MembersRequest, { rejectValue: string }>(
    'membersList/fetchMembers',
    async ({page, perPage}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${page}&per_page=${perPage}`);
            return response.data as MembersListData;
        } catch (error) {
            return rejectWithValue('Occured error when loading members data!');
        }
    },
);

interface MembersListState {
    members: MembersListData | null;
    isLoading: boolean;
    error: string | undefined | null;
}

const initialState: MembersListState = {
    members: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
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
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
