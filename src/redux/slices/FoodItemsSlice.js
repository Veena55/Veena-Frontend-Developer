import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    foodItems: [],
    isLoading: false,
    foodItemById: {},
    error: null,
    sortDirection: true, // true -> accending, false -> descending
    isModalOpen: false, // handle modal open & close(by default close)
    idToFilter: null,
    pageNo: 0
}

export const fetchFoodItems = createAsyncThunk('food_list/fetchFoodItems',
    async () => {
        console.log("thunk1");
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

export const filteredDataById = createAsyncThunk('food_list/filteredDataById',
    async (idToFilter) => {
        console.log("thunk3");
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idToFilter}`);
        console.log(data.meals);
        return data.meals;
    });
/**
 * {
 * state: {
 *  food_list: {
 *      is_loading: false 
 * }
 * }
 * }
 */
const FoodItemsSlice = createSlice({
    name: 'food_list',
    initialState,
    reducers: {
        // sort data in alphabatical order
        sortFoodItemsList: (state) => {
            // reversing the past direction
            state.sortDirection = !state.sortDirection;
            if (state.sortDirection)
                state.foodItems.sort((a, b) => {
                    if (a.strMeal < b.strMeal) return -1; // a comes before b
                    if (a.strMeal > b.strMeal) return 1;  // a comes after b
                    return 0; // They are equal
                })
            else
                state.foodItems.sort((a, b) => {
                    if (a.strMeal > b.strMeal) return -1; // a comes before b
                    if (a.strMeal < b.strMeal) return 1;  // a comes after b
                    return 0; // They are equal
                })
        },
        // handleModal
        handleModal: (state, action) => {
            const { value, idMeal } = action.payload;
            console.log(value, idMeal);
            state.isModalOpen = value;
            state.idToFilter = idMeal;
        },
        //handlePgination
        fetchDataByPageNo: (state, action) => {
            state.pageNo = action.payload;
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
            //Handle Filter By Area
            .addCase(filteredByAreaData.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(filteredByAreaData.fulfilled, (state, action) => {
                state.isLoading = false
                state.foodItems = action.payload
            })
            .addCase(filteredByAreaData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            //Handle Filter By Id
            .addCase(filteredDataById.pending, (state) => {
                // state.isLoading = true
                state.error = null
            })
            .addCase(filteredDataById.fulfilled, (state, action) => {
                // state.isLoading = false
                state.foodItemById = action.payload
            })
            .addCase(filteredDataById.rejected, (state, action) => {
                // state.isLoading = false
                state.error = action.error.message
            })
    }
})

//Action createors

export const { sortFoodItemsList, handleModal, fetchDataByPageNo } = FoodItemsSlice.actions;

//Exporting the selectors
export const foodSelector = (state) => state.food_list.foodItems;
export const foodItemByIdSelector = (state) => state.food_list.foodItemById;
export const loadingSelector = (state) => state.food_list.isLoading;
export const errorSelector = (state) => state.food_list.error;
export const sortDirectionSelector = (state) => state.food_list.sortDirection;
export const isModalOpenSelector = (state) => state.food_list.isModalOpen;
export const pageNoSelector = (state) => state.food_list.pageNo;

// Exporting the reducer to be added to the store
export default FoodItemsSlice.reducer;
