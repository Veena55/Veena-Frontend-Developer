import React from 'react';
import FoodList from '../components/FoodList';
import { renderWithProviders } from '../utils/test-utils';

describe('<FoodCard>', () => {
  it('should render component', () => {
    expect(renderWithProviders(<FoodList />)).toMatchSnapshot();
  });



});