import React from 'react'
import FoodCard from './FoodCard'

const FoodList = () => {
    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Restaurants with online food delivery in Chhindwara</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-5">
                <FoodCard />
                <FoodCard />
                <FoodCard />
                <FoodCard />
            </div>
        </div>
    )
}

export default FoodList