import React from 'react'; // Add this import
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from '../components/Dropdown'; // Make sure this path is correct

// Mock data for the test
const mockAreas = [
    { strArea: 'Indian' },
    { strArea: 'American' }
];

const mockGetListOfFoodByArea = jest.fn();

describe('Dropdown Component', () => {
    test('renders the correct number of radio buttons', () => {
        render(<Dropdown areas={mockAreas} getListOfFoodByArea={mockGetListOfFoodByArea} />);

        const radioButtons = screen.getAllByRole('radio');
        expect(radioButtons.length).toBe(mockAreas.length); // Should match the number of areas
    });

    test('displays correct label for each area', () => {
        render(<Dropdown areas={mockAreas} getListOfFoodByArea={mockGetListOfFoodByArea} />);

        mockAreas.forEach((area) => {
            const label = screen.getByText(area.strArea);
            expect(label).toBeInTheDocument();
        });
    });

    test('calls getListOfFoodByArea when a radio button is selected', () => {
        render(<Dropdown areas={mockAreas} getListOfFoodByArea={mockGetListOfFoodByArea} />);

        const radioButtons = screen.getAllByRole('radio');
        fireEvent.click(radioButtons[1]); // Simulate clicking on the second radio button (Mexican)
        expect(mockGetListOfFoodByArea).toHaveBeenCalledWith(mockAreas[1].strArea);
    });
});
