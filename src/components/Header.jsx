import React from 'react'
import { BiSearch } from 'react-icons/bi'
import { SiSwiggy } from 'react-icons/si'

const Header = () => {
    return (
        <div className="bg-white shadow-lg shadow-slate-200 p-2">
            <div className="max-w-7xl mx-auto bg-white h-16 w-full flex justify-between items-center">
                <div>
                    <SiSwiggy className="bg-themeBg text-white p-2 rounded-md" size={50} />
                </div>
                <div>
                    <button className="flex items-center gap-2 font-medium text-slate-600">
                        <p>Search</p>
                        <BiSearch size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header