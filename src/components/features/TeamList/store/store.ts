import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import membersSlice from './membersSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        members: membersSlice
    },

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export default store;
