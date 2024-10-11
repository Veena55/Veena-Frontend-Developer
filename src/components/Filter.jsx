import React from 'react'
import { FaFilter } from 'react-icons/fa'

const Filter = () => {
    return (
        <div className="border border-themeColor rounded-full inline-block w-[max-content]">
            <div className="flex gap-2 items-center py-1 px-3">
                <FaFilter className="text-themeColor" />
                <p>Filter By Area</p>
            </div>
        </div>
    )
}

export default Filter