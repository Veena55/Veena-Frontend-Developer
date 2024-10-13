import React, { useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { FcRating } from 'react-icons/fc';
import { Md18UpRating, MdStars } from 'react-icons/md';
import Modal from './Modal';
import { useDispatch } from 'react-redux';
import { filteredDataById, handleModal } from '../redux/slices/FoodItemsSlice';

const FoodCard = ({ item }) => {
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch()
    // const [isModelOpen, setisModelOpen] = useState(false);
    // const generateRating = () => {
    useEffect(() => {
        const generatedRating = (Math.random() * 4 + 1).toFixed(2);
        setRating(generatedRating);
    }, []);

    const handleModel = (value) => {
        console.log(value, item.idMeal);

        // dispatch modal is true and current value/id this will update state as to show modal with current id
        dispatch(handleModal({ value, idMeal: item.idMeal }));
        dispatch(filteredDataById(item.idMeal));
        // setisModelOpen(value);
    }




    // }
    return (
        <>
            <div className="transition-all duration-300 hover:scale-95" onClick={() => handleModel(true)}>
                <div className="relative">
                    <div className="h-44 w-full">
                        <img
                            className="rounded-2xl h-full w-full object-cover object-center"
                            src={item.strMealThumb}
                            alt={item.strMeal}
                        />
                    </div>
                    <div className="absolute top-1/2 bottom-0 right-0 left-0 rounded-bl-2xl rounded-br-2xl bg-gradient-to-t from-black to-transparent flex items-end">
                        {/* <p className='text-white font-extrabold text-xl pl-5 py-2'>ITEM1</p> */}
                    </div>
                </div>
                <div className="p-2 pl-5">
                    <div className="flex gap-2 items-center justify-between">
                        <p className="font-extrabold text-lg line-clamp-1">{item.strMeal}</p>
                        <div className="flex items-center gap-1">
                            <MdStars className={`${rating <= 2 ? 'text-red-500' : 'text-green-500'}  text-2xl`} />
                            <p>{rating}</p>
                        </div>
                        {/* <p className="font-semibold">.55-60 mins</p> */}
                    </div>
                    <p className="line-clamp-1 mt-1 text-gray-600">Other discription of the product & details see here</p>
                </div>
            </div>
            {/* {isModelOpen && <Modal close={handleModel} foodId={item.idMeal} />} */}
        </>
    );
};

export default FoodCard;
