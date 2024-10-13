import { configureStore } from '@reduxjs/toolkit';
import FoodItemsReducer from '../src/redux/slices/FoodItemsSlice';
export const setupStore = (preloadedState) => configureStore({
    reducer: {
        food_list: FoodItemsReducer
    },
    preloadedState
});