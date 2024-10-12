import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { SiSwiggy } from 'react-icons/si'
import SearchBox from './SearchBox'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="bg-white shadow-lg p-2 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto bg-white h-16 w-full flex justify-between items-center px-5 lg:p-0">
                    <div>
                        <a href='/'>
                            <SiSwiggy className="bg-themeBg text-white p-2 rounded-md" size={50} />
                        </a>
                    </div>
                    <div>
                        <Link to="/search" className="flex items-center gap-2 font-medium text-slate-600">
                            <p>Search</p>
                            <BiSearch size={20} />
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header