import { configureStore } from '@reduxjs/toolkit';
import FoodItemsReducer from '../src/redux/slices/FoodItemsSlice';
export default store = configureStore({
    reducer: {
        food_list: FoodItemsReducer
    },
});