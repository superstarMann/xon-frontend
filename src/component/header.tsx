import React from 'react';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useMe } from '../usehook/useMe';
export const Header = () =>{
    const {data} = useMe();
    return(
        <>
        {!data?.me.verified && (
            <div className='bg-yellow-50 flex justify-center py-3 items-center'>
                <Link to='/confirm'>
                <span className='text-blue-600 text-xs font-semibold'>Please verify your email.</span>
                </Link>
            </div>
        )}
        <div className='lg:bg-gray-700'>
            <div className='w-full flex justify-between items-center lg:text-white max-w-screen-3xl mx-auto py-5 px-5 lg:px-10'>
                <Link to='/'>
                   <FontAwesomeIcon icon={faGg} className='text-2xl'/>
                </Link>
                <Link to='/edit-profile'>
                   <FontAwesomeIcon icon={faUser} className='text-2xl'/>
                </Link>
            </div>
        </div>
        </>
    )
}