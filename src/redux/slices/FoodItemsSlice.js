import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodItems: [],
    isLoading: false,
    error: null
}

const FoodItemsSlice = createSlice({
    name: 'food_list',
    initialState,
    reducers: {
        listOfFood: (state, action) => {
            return state.foodItems;
        },
        filterByArea: (state, action) => {
            return state.foodItems.filter((item) => item.area == action.payload);
        }
    },
    extraReducers: {}
})

// Action creators are generated for each case reducer function
export const { listOfFood, filterByArea } = FoodItemsSlice.actions;
export const FoodSelector = FoodItemsSlice.state.food_list.foodItems;
export default FoodItemsSlice.reducer;
