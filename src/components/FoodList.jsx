import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard'; // A component that displays each food item
import Filter from './Filter'; // A filter component to filter food by area
import Sort from './Sort'; // A sort component
import Dropdown from './Dropdown'; // Dropdown component for area filter
import { useDispatch, useSelector } from 'react-redux';
import { errorSelector, fetchDataByPageNo, fetchFoodItems, filteredByAreaData, foodSelector, isModalOpenSelector, loadingSelector, pageNoSelector } from '../redux/slices/FoodItemsSlice';
import { CgSpinner } from 'react-icons/cg';
import Modal from './Modal'; // A modal component to show detailed food info
import axios from 'axios';

const FoodList = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [areaList, setAreaList] = useState([]);
    const [area, setArea] = useState('India');

    const dispatch = useDispatch();
    const records = useSelector(pageNoSelector); // Current page number
    const foodItemsList = useSelector(foodSelector); // Food items fetched from API
    const isLoading = useSelector(loadingSelector); // Loading state
    const error = useSelector(errorSelector); // Error state
    const isModalOpen = useSelector(isModalOpenSelector); // Modal state

    // Fetch food items when component mounts
    useEffect(() => {
        dispatch(fetchFoodItems());
    }, [dispatch]);

    // Fetch areas for filtering (external API)
    const getAllArea = async () => {
        const { data } = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        setAreaList(data.meals);
    };

    useEffect(() => {
        getAllArea();
    }, []);

    const getListOfFoodByArea = (areaToFilter) => {
        // if (e.target.value === "on") {
        setArea(areaToFilter);
        dispatch(filteredByAreaData(areaToFilter));
        setIsDropdownVisible(false);
        // }
    };

    // Pagination handling
    const handlePage = (pageNumber) => {
        dispatch(fetchDataByPageNo(pageNumber));
    };

    // Show loading spinner while fetching data
    if (isLoading) {
        return (
            <div className="flex justify-center">
                <CgSpinner className="text-themeColor animate-spin duration-200" size={50} />
            </div>
        );
    }

    // Display error if there's an issue fetching data
    if (error) {
        return <div className="text-red-500 font-bold text-xl italic capitalize">Error.. {error} !</div>;
    }

    return (
        <div className="px-5 lg:px-0">
            <div>
                <h1 className="font-bold text-2xl">Restaurants with online food delivery in {area}</h1>
            </div>
            <div className="py-5 flex gap-3">
                <div className="relative">
                    <Filter handleFilter={() => setIsDropdownVisible(!isDropdownVisible)} />
                    {isDropdownVisible && (
                        <Dropdown areas={areaList} getListOfFoodByArea={getListOfFoodByArea} />
                    )}
                </div>
                <Sort />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-3">
                {foodItemsList.slice(records * 12, (records + 1) * 12).map((item) => (
                    <FoodCard key={item.idMeal} item={item} />
                ))}
            </div>
            <div className="flex justify-end items-center gap-2">
                <button
                    className="bg-gray-200 border border-gray-200 text-slate-500 px-5 py-1 rounded-md hover:bg-gray-300 hover:text-black"
                    onClick={() => handlePage(records - 1)}
                    disabled={records === 0}
                >
                    Prev
                </button>
                <button
                    className="bg-gray-200 border border-gray-200 text-slate-500 px-5 py-1 rounded-md hover:bg-gray-300 hover:text-black"
                    onClick={() => handlePage(records + 1)}
                    disabled={foodItemsList.length <= (records + 1) * 12}
                >
                    Next
                </button>
            </div>
            {isModalOpen && <Modal />}
        </div>
    );
};

export default FoodList;
