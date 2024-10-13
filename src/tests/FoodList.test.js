import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FoodList from '../components/FoodList'; // Adjust the import path as needed
import { fetchFoodItems, filteredByAreaData, fetchDataByPageNo } from '../redux/slices/FoodItemsSlice';

const mockStore = configureStore([]);

jest.mock('../redux/slices/FoodItemsSlice', () => ({
    fetchFoodItems: jest.fn(),
    filteredByAreaData: jest.fn(),
    fetchDataByPageNo: jest.fn(),
}));

describe('FoodList Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            foodItems: [],
            isLoading: false,
            error: null,
            isModalOpen: false,
            pageNo: 0,
            foodItemsList: [
                { idMeal: '1', strMeal: 'Meal 1', strMealThumb: 'http://example.com/meal1.jpg' },
                { idMeal: '2', strMeal: 'Meal 2', strMealThumb: 'http://example.com/meal2.jpg' },
                // Add more mock food items if necessary
            ],
        });
    });

    test('renders the FoodList component correctly', () => {
        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        expect(screen.getByText(/restaurants with online food delivery in/i)).toBeInTheDocument();
    });

    test('displays loading spinner while fetching data', () => {
        store = mockStore({
            isLoading: true,
            foodItemsList: [],
        });

        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('displays error message when there is an error', () => {
        store = mockStore({
            isLoading: false,
            error: 'Failed to fetch',
            foodItemsList: [],
        });

        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        expect(screen.getByText(/error.. failed to fetch/i)).toBeInTheDocument();
    });

    test('fetches food items on component mount', async () => {
        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        // Check if the fetchFoodItems action was called
        expect(fetchFoodItems).toHaveBeenCalled();
    });

    test('filters food items by area when an area is selected', async () => {
        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        // Simulate clicking on the filter button
        fireEvent.click(screen.getByRole('button', { name: /filter/i }));

        // Simulate selecting an area from the dropdown (you need to adjust this part based on your Dropdown implementation)
        fireEvent.click(screen.getByText(/area name/i)); // Replace 'area name' with an actual area name

        await waitFor(() => {
            expect(filteredByAreaData).toHaveBeenCalledWith('area name'); // Replace 'area name' with the selected area
        });
    });

    test('handles pagination correctly', () => {
        render(
            <Provider store={store}>
                <FoodList />
            </Provider>
        );

        // Simulate pagination
        fireEvent.click(screen.getByRole('button', { name: /next/i }));

        expect(fetchDataByPageNo).toHaveBeenCalledWith(1); // Assuming page 0 is the initial
    });
});
