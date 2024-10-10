import React from 'react'

const SearchBox = () => {
    return (
        <div className='mt-5 max-w-7xl mx-auto'>
            <input type="search" className="w-full border-2 p-3 focus:outline-none placeholder:text-black rounded-lg placeholder:pl-3" placeholder="Search here..." />
        </div>
    )
}

export default SearchBox