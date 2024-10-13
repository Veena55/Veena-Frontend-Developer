import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { filteredDataById, foodItemByIdSelector, handleModal } from '../redux/slices/FoodItemsSlice';
import { BiSolidHandDown, BiVideo } from 'react-icons/bi';
import { CgSpinner } from 'react-icons/cg';

const Modal = () => {
    const dispatch = useDispatch();
    const [seeMore, setSeeMore] = useState(false); // State to track whether to show more or less text

    const closeModal = () => {
        dispatch(handleModal(false));
    }


    const foodItemInfo = useSelector(foodItemByIdSelector)[0];

    let ingredients = [];
    if (foodItemInfo) {
        for (let i = 1; i < 21; i++) {
            let key = `strIngredient${i}`;
            let ingredient = foodItemInfo[key];
            if (ingredient != '')
                ingredients.push(ingredient);
        }
        ingredients = ingredients.join(', ');
    }

    const handleSeeMoreToggle = () => {
        setSeeMore(prev => !prev); // Toggle the seeMore state
    }

    return (
        <div className="fixed inset-0 p-3 lg:p-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="lg:w-1/2 max-w-2xl h-[80vh] overflow-y-auto bg-white rounded-xl border shadow-lg p-6 relative">
                {foodItemInfo ? (
                    <div>
                        <div className="flex justify-between">
                            <h3 className="text-lg font-bold mb-3">{foodItemInfo.strMeal}</h3>
                            <RxCross2
                                className="font-extrabold bg-red-100 p-1 text-red-500 cursor-pointer"
                                size={25}
                                onClick={closeModal} // Close modal on click
                            />
                        </div>
                        <hr />
                        <div className="mt-5">
                            <div className="flex gap-5">
                                <div className="flex gap-2">
                                    <p className="text-themeColor font-medium">Cuisine:</p>
                                    <p>{foodItemInfo.strArea}</p>
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-themeColor font-medium">Category:</p>
                                    <p>{foodItemInfo.strCategory}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 pt-2">
                                <div className="flex gap-2">
                                    <p className="text-themeColor font-medium whitespace-nowrap">Food Ingredients:</p>
                                    <p>
                                        {ingredients}
                                    </p>
                                </div>
                            </div>
                            <div className="pt-2">
                                <h3 className="text-themeColor font-medium">Food Instructions:</h3>

                                <p className='text-justify'>
                                    {seeMore ? foodItemInfo.strInstructions : `${foodItemInfo.strInstructions.slice(0, 100)}...`}
                                    <button
                                        className="text-themeColor underline ml-2"
                                        onClick={handleSeeMoreToggle}
                                    >
                                        {seeMore ? 'See less' : 'See more'}
                                    </button>
                                </p>
                            </div>
                            <div className="mt-5">
                                <div className="flex gap-3 py-2">
                                    <h2 className='font-semibold text-lg'> Want to know the recipe?</h2>
                                    <BiSolidHandDown className="text-orange-300" size={25} />
                                </div>
                                <iframe
                                    width="100%"
                                    height="250"
                                    src={`https://www.youtube.com/embed/${(foodItemInfo.strYoutube).split("=")[1]}`}
                                    frameBorder="0"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>No data available for this food item.</p>
                )}
            </div>
        </div>
    );
}

export default Modal;
