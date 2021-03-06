import React from 'react';
import { Link } from 'react-router-dom';

interface ISharemusleProps{
    id: string;
    name: string;
    coverImg?: string;
    countryName: string;
    address: string;
}

export const ShareMusle:React.FC<ISharemusleProps> = ({name, coverImg, countryName ,id, address}) => {
    return(
        <Link to={`/shareMusle/${id}`}>
        <div className='flex flex-col'>
            <div style={{backgroundImage: `url(${coverImg})`}}
             className='bg-red-600 rounded-lg py-40 bg-cover bg-center transform hover:scale-105 transition'></div>
             <h3 className='lg:text-white text-xl mt-2'>
                {name}
            </h3>
            <div className='lg:text-white opacity-70 text-base'>{address}</div>
             <span className='lg:text-gray-300 border-t-2 lg:border-gray-400 pt-2 border-gray-200 text-xs mt-2'>
                {countryName} 
             </span>
        </div>
        </Link>
    )
}