import { configureStore } from '@reduxjs/toolkit';

import carReducer from './carSlice'
import userReducer from './userSlice'
import itemReducer from './itemSlice'; 

export default configureStore({
  reducer: {
    car: carReducer,
    user: userReducer,
    item: itemReducer, 
  },
});
