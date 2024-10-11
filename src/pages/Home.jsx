import React from 'react'
import FoodList from '../components/FoodList'

const Home = () => {
    return (
        <>
            <div className="flex-auto max-w-7xl mx-auto py-5">
                <FoodList />
            </div>
        </>
    )
}

export default Home