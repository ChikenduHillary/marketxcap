import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: { component: string} = {
    component: '',
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        isLoading: (state, action: PayloadAction<{ component: string }>) => {
            state.component = action.payload.component;
        }
    }
});

export const selectLoader = (state: RootState) => state.loader;
export const { isLoading } = loaderSlice.actions;
export default loaderSlice.reducer;