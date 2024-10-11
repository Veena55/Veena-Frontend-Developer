import React from 'react'
import { CgCopyright } from 'react-icons/cg'
import { SiSwiggy } from 'react-icons/si'

const Footer = () => {
    return (
        <div className="bg-black w-full p-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-1 items-center text-white">
                    <SiSwiggy size={25} />
                    <h3 className="font-bold">Swiggy</h3>
                </div>
                <small className='flex items-center gap-1 mt-2 text-slate-400 '><CgCopyright /> 2024 Bundi Technologies Pvt. Ltd.</small>
            </div>
        </div>
    )
}

export default Footer