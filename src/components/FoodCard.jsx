import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { FcRating } from 'react-icons/fc';
import { Md18UpRating, MdStars } from 'react-icons/md';

const FoodCard = () => {
    return (
        <div className="transition-all duration-300 hover:scale-95">
            <div className="relative">
                <div className="h-44 w-full">
                    <img
                        className="rounded-2xl h-full w-full object-cover object-center"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/7/17/0b7ba7a1-f341-44f3-b54c-e221f5fdcf5f_155268.jpg"
                        alt="food"
                    />
                </div>
                <div className="absolute top-1/2 bottom-0 right-0 left-0 rounded-bl-2xl rounded-br-2xl bg-gradient-to-t from-black to-transparent flex items-end">
                    {/* <p className='text-white font-extrabold text-xl pl-5 py-2'>ITEM1</p> */}
                </div>
            </div>
            <div className="p-2 pl-5">
                <p className="font-extrabold text-lg">Food 1</p>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center">
                        <MdStars className="text-green-800 text-2xl" />
                        <p>4.6</p>
                    </div>
                    <p className="font-semibold">.55-60 mins</p>
                </div>
                <p className="line-clamp-1 mt-1 text-gray-600">Other discription of the product & details see here</p>
            </div>
        </div>
    );
};

export default FoodCard;
