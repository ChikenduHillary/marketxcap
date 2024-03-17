import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: { navState: boolean } = {
    navState: false,
}

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleNav: (state, action: PayloadAction<{ navState: boolean }>) => {
            state.navState = action.payload.navState;
        }
    }
});

export const selectNav = (state: RootState) => state.nav;
export const { toggleNav } = navSlice.actions;
export default navSlice.reducer;