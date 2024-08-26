import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='flex justify-between items-center h-16 text-white bg-slate-950 px-4 sm:px-6 lg:px-8'>
            <div className='text-xl font-semibold'>
                TestiGatherer
            </div>
            <div className='flex items-center'>
                <button onClick={() => {
                    navigate('/signin')
                }} className='text-gray-200 text-sm sm:text-base p-2 mr-2'>
                    Sign in
                </button>
                <button onClick={() => {
                    navigate('/signup')
                }} className='text-sm sm:text-base bg-blue-500 text-white rounded p-2 sm:p-3'>
                    Sign up
                </button>
            </div>
        </div>
    )
}

export default Navbar