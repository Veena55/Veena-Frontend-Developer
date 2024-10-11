import React from 'react'
import { FaSort } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { sortFoodItemsList } from '../redux/slices/FoodItemsSlice';

const Sort = () => {
    const dispatch = useDispatch();
    const sortFoodItems = () => {
        dispatch(sortFoodItemsList());
    }
    return (
        <button className="border border-themeColor rounded-full inline-block w-[max-content]"
            onClick={sortFoodItems}
        >
            <div className="flex gap-2 items-center py-1 px-3">
                Sort
                <FaSort className="text-themeColor" />
            </div>
        </button>
    )
}

export default Sort
