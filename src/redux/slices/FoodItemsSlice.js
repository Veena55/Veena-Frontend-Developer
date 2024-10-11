import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    foodItems: [],
    isLoading: false,
    error: null
}
console.log("jhhh", initialState);

export const fetchFoodItems = createAsyncThunk('food_list/fetchFoodItems',
    async () => {
        console.log("thunk");
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
        return data.meals;
    });
export const filteredByAreaData = createAsyncThunk('food_list/filteredByAreaData',
    async (areaToFilter) => {
        console.log("thunk2");
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaToFilter}`);
        console.log(data.meals);
        return data.meals;
    });

const FoodItemsSlice = createSlice({
    name: 'food_list',
    initialState,
    reducers: {
        // sort data in alphabatical order
        sortFoodItemsList: (state) => {
            console.log("hi");
            state.foodItems.sort((a, b) => {
                if (a.strMeal < b.strMeal) return 1;  // a comes after b
                if (a.strMeal > b.strMeal) return -1; // a comes before b
                return 0; // They are equal
            })
            //Sorting Z->A (as there are already in asecnding order by default)
            // state.foodItems.sort((a, b) => {
            //     if (a.strMeal < b.strMeal) return 1; // a comes after b
            //     if (a.strMeal > b.strMeal) return -1; // a comes before b
            //     return 0; // They are equal
            // });
        }
    },
    extraReducers: (builder) => {
        //Basic fetch by (Indian food)
        builder
            .addCase(fetchFoodItems.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchFoodItems.fulfilled, (state, action) => {
                state.isLoading = false
                // Saving the fetched food items
                state.foodItems = action.payload
            })
            .addCase(fetchFoodItems.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            //Handle Filter by area
            .addCase(filteredByAreaData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(filteredByAreaData.fulfilled, (state, action) => {
                state.isLoading = false
                state.foodItems = action.payload
            })
            .addCase(filteredByAreaData.rejected, (state) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
})

//Action createors

export const { sortFoodItemsList } = FoodItemsSlice.actions;

//Exporting the selectors
export const foodSelector = (state) => state.food_list.foodItems;
export const loadingSelector = (state) => state.food_list.isLoading;
export const errorSelector = (state) => state.food_list.error;

// Exporting the reducer to be added to the store
export default FoodItemsSlice.reducer;
