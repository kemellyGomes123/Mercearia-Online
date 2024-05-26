import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({ 
  name: 'User',
  role: 'Role',
  balance: 'Balance',
  email: 'Email',
  id: 'Id',
  address: 'Address',
  initialState: {
    name: '',
    role: '',
    balance: 0,
    email: '',
    address: '',
    id: 0
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.balance = action.payload.balance;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.id = action.payload.id;
    },
    removeUser: (state) => {
      state.name = '';
    },
    setUserRole: (state, action) => {
        state.role = action.payload;
      },
  },
});

export const { addUser, removeUser, setUserRole } = userSlice.actions; 

export default userSlice.reducer;