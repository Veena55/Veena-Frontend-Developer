import React, { useState } from 'react'
import FoodCard from './FoodCard'
import Filter from './Filter'
import Sort from './Sort'
import Dropdown from './Dropdown'

const FoodList = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const handleFilter = () => {
        console.log("hi");
        setIsDropdownVisible(prev => !prev)
    }
    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Restaurants with online food delivery in Chhindwara</h1>
            </div>
            <div className="py-5 flex gap-3">
                <div className="relative">
                    <Filter handleFilter={handleFilter} />
                    {isDropdownVisible && <Dropdown />}
                </div>
                <Sort />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-3">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </div>
        </div>
    )
}

export default FoodList