import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { login, register } from '../../api/authApi';

import { AppDispatch } from './store';

export interface Credentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    id: string;
    token: string;
}

export const loginUser = createAsyncThunk<string, Credentials, { rejectValue: string }>(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const { token } = await login(credentials);
            return token;
        } catch (error) {
            return rejectWithValue('Неверный логин/пароль');
        }
    },
);

export const registerUser = createAsyncThunk<RegisterResponse, Credentials, { rejectValue: string }>(
    'auth/registerUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const registerResponse = await register(credentials);
            return registerResponse;
        } catch (error) {
            return rejectWithValue('Не удалось зарегистрировать пользователя');
        }
    },
);

export const checkToken = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
    'auth/checkToken',
    async (_, { dispatch }) => {
        const token = localStorage.getItem('featureTeamToken');
        if (token) {
            dispatch(setToken(token));
        }
    },
);

interface AuthState {
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    token: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
            localStorage.removeItem('featureTeamToken');
        },
        cleanError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.token = action.payload;
                localStorage.setItem('featureTeamToken', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.token = action.payload.token;
                localStorage.setItem('featureTeamToken', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, cleanError, setToken } = authSlice.actions;
export default authSlice.reducer;
