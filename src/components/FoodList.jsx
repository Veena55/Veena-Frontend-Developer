import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard'
import Filter from './Filter'
import Sort from './Sort'
import Dropdown from './Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { errorSelector, fetchFoodItems, filteredByAreaData, foodSelector, loadingSelector } from '../redux/slices/FoodItemsSlice'
import { CgSpinner } from 'react-icons/cg'
import axios from 'axios'

const FoodList = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [areaList, setAreaList] = useState([]);
    const [area, setArea] = useState('India');

    const dispatch = useDispatch();

    //foodItemsList
    const foodItemsList = useSelector(foodSelector);

    //loading state
    const isLoading = useSelector(loadingSelector);

    //error state
    const error = useSelector(errorSelector);


    useEffect(() => {
        console.log("hi");
        dispatch(fetchFoodItems());
        console.log(foodItemsList);
    }, [dispatch])


    const handleFilter = () => {
        console.log("hi");
        setIsDropdownVisible(prev => !prev)
    }
    const getAllArea = async () => {
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        setAreaList(data.meals);
    }

    useEffect(() => {
        getAllArea();
    }, [])

    const getListOfFoodByArea = (e, areaToFilter) => {
        console.log(e.target.value);
        if (e.target.value == "on") {
            setArea(areaToFilter);
            dispatch(filteredByAreaData(areaToFilter));
            setIsDropdownVisible(false);
        }
    }


    if (isLoading) {
        return <div className="flex justify-center"><CgSpinner className='text-themeColor animate-spin duration-200' size={50} /></div>
    }

    if (error) {
        return <div className='text-red-500 font-bold text-xl italic capitalize'>Error.. {error} !</div>
    }

    return (
        <div>
            <div>
                <h1 className="font-bold text-2xl">Restaurants with online food delivery in {area}</h1>
            </div>
            <div className="py-5 flex gap-3">
                <div className="relative">
                    <Filter handleFilter={handleFilter} />
                    {isDropdownVisible && <Dropdown areas={areaList} getListOfFoodByArea={getListOfFoodByArea} />}
                </div>
                <Sort />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-3">
                {console.log(foodItemsList)}
                {foodItemsList.map((item, index) => {
                    console.log(item);
                    return <FoodCard key={item.idMeal} item={item} />

                })}
                {/* <FoodCard />
                <FoodCard />
                <FoodCard /> */}
            </div>
        </div>
    )
}

export default FoodList