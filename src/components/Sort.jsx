import React from 'react'
import { FaSort } from 'react-icons/fa'

const Sort = () => {
    return (
        <button className="border border-themeColor rounded-full inline-block w-[max-content]">
            <div className="flex gap-2 items-center py-1 px-3">
                Sort
                <FaSort className="text-themeColor" />
            </div>
        </button>
    )
}

export default Sort
