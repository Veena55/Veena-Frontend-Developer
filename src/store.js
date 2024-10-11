import { configureStore } from '@reduxjs/toolkit';
import FoodItemsReducer from '../src/redux/slices/FoodItemsSlice';
export const store = configureStore({
    reducer: {
        food_list: FoodItemsReducer
    },
});