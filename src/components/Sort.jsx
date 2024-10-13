import React from 'react'
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { sortFoodItemsList, sortDirectionSelector } from '../redux/slices/FoodItemsSlice';

const Sort = () => {
    const dispatch = useDispatch();
    const sortFoodItems = () => {
        dispatch(sortFoodItemsList());
    }
    const sortDirection = useSelector(sortDirectionSelector);
    return (
        <button className="border border-themeColor rounded-full inline-block w-[max-content]"
            onClick={sortFoodItems}
        >
            <div className="flex gap-2 items-center py-1 px-3">
                Sort
                {sortDirection ? <FaSortAlphaDown className="text-themeColor" /> : <FaSortAlphaUp className="text-themeColor" />}
            </div>
        </button>
    )
}

export default Sort
