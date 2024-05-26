import { createSlice } from '@reduxjs/toolkit';

export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(...action.payload);
            
        },
    },
});

export const { addItem } = itemSlice.actions;

export default itemSlice.reducer;