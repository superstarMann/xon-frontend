import React from "react";

interface IDriver {
    lat: number;
    lng: number;
    $hover?: any;
}

export const GuaderDriver:React.FC<IDriver> = () => {
    return(
        <div className='text-lg'>
            🥷
        </div>
    )
}