import React from'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return(
        <div className='h-screen flex flex-col items-center lg:justify-center lg:bg-gray-700 lg:text-white'>
            <div className='w-full text-center px-5 mt-10 lg:mb-10'>
            <h2 className='text-2xl font-semibold mb-3 '>Page Not Found</h2>
            <h4 className='text-base font-medium mb-5'> The page you're looking for does not exist or has moved.</h4>
            <Link to='/' className='text-indigo-500 lg:text-yellow-200 hover:underline'>
                Go back home &rarr;
            </Link>
            </div>
        </div>
    )
}