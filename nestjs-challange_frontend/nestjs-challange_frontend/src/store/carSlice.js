import { createSlice } from '@reduxjs/toolkit';

export const carSlice = createSlice({ 
  name: 'carrinhoCompra',
  initialState: {
    list: [],
  },
  reducers: {
    addCar: (state, action) => {
      state.list.push(action.payload);
    },
    removeCar: (state, action) => {
      state.list = state.list.filter(car => car.id !== action.payload.id); 
    },
    updateCar: (state, action) => {
      state.list = state.list.map((car) => {
        return car.id === action.payload.id ? action.payload : car;
      });
    },
    clearCart: (state) => {
      state.list = [];
    },
  },
});

export const { addCar, removeCar, updateCar,clearCart } = carSlice.actions; 

export default carSlice.reducer;
