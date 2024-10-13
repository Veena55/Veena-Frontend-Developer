import React from 'react';

const Dropdown = ({ areas, getListOfFoodByArea }) => {
    return (
        <div className="shadow-lg rounded-xl w-[max-content] h-60 overflow-auto px-7 py-3 bg-white absolute z-20 top-3/4">
            {areas.map((area, index) => (
                <div className="flex items-center gap-2 mt-2" key={index}>
                    <input
                        type="radio"
                        name="area"
                        onChange={(e) => getListOfFoodByArea(e, area.strArea)}
                    />
                    <label>{area.strArea}</label>
                </div>
            ))}
        </div>
    );
};

export default Dropdown;
