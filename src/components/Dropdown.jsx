import React from 'react'

const Dropdown = ({ data }) => {
    return (
        <div className="shadow-lg rounded-xl w-[max-content] px-7 py-3 bg-white absolute z-20 top-3/4">
            <div className="flex items-center gap-2 mt-2">
                <input type="radio" name="area" />
                <label>Area1</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <input type="radio" name="area" />
                <label>Area1</label>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <input type="radio" name="area" />
                <label>Area1</label>
            </div>
        </div>
    )
}

export default Dropdown