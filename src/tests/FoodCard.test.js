import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { handleModal, filteredDataById } from '../redux/slices/FoodItemsSlice';
import FoodCard from '../components/FoodCard';
import '@testing-library/jest-dom/extend-expect';
const mockStore = configureStore([]);

describe('FoodCard Component', () => {
    let store;
    const mockItem = {
        idMeal: '12345',
        strMeal: 'Tasty Meal',
        strMealThumb: 'http://example.com/image.jpg',
    };

    beforeEach(() => {
        store = mockStore({
            foodItems: [],
            isLoading: false,
            foodItemById: {},
            error: null,
            sortDirection: true, // true -> ascending, false -> descending
            isModalOpen: false, // handle modal open & close (by default close)
            idToFilter: null,
            pageNo: 0
        });
        jest.spyOn(global.Math, 'random').mockImplementation(() => 0.5); // Mocking for a consistent rating of 3.00
    });

    afterEach(() => {
        jest.spyOn(global.Math, 'random').mockRestore(); // Restore original Math.random
    });

    test('renders the FoodCard with meal details', () => {
        render(
            <Provider store={store}>
                <FoodCard item={mockItem} />
            </Provider>
        );

        // Check if the meal name is displayed
        expect(screen.getByText(mockItem.strMeal)).toBeInTheDocument();

        // Check if the image is displayed
        const img = screen.getByAltText(mockItem.strMeal);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', mockItem.strMealThumb);
    });

    test('displays a rating', () => {
        render(
            <Provider store={store}>
                <FoodCard item={mockItem} />
            </Provider>
        );

        // Check if the rating is displayed
        const ratingText = screen.getByText(/^\d+\.\d+$/); // Regex to match decimal numbers
        expect(ratingText).toBeInTheDocument();
    });

    test('dispatches actions on click', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');

        render(
            <Provider store={store}>
                <FoodCard item={mockItem} />
            </Provider>
        );

        const card = screen.getByRole('img', { name: /tasty meal/i }).closest('div');
        fireEvent.click(card); // Simulate a click on the FoodCard

        // Check if the correct actions are dispatched
        expect(dispatchSpy).toHaveBeenCalledWith(handleModal({ value: true, idMeal: mockItem.idMeal }));
        expect(dispatchSpy).toHaveBeenCalledWith(filteredDataById(mockItem.idMeal));
    });
});
