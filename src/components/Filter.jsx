import React from 'react'
import { FaFilter } from 'react-icons/fa'
import Dropdown from './Dropdown'

const Filter = ({ handleFilter }) => {
    return (
        <>

            <div className="border border-themeColor rounded-full inline-block w-[max-content]">
                <button className="flex gap-2 items-center py-1 px-3 cursor-pointer" onClick={handleFilter}>
                    Filter By Area
                    <FaFilter className="text-themeColor" />
                </button>
            </div>
        </>
    )
}

export default Filter