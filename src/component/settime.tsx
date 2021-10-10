import React, { useEffect, useState } from 'react';

interface AlertProps{
    alertText: string;
}

export const Alert : React.FC<AlertProps> =({alertText}) =>{
    const sayHi = () => {
        alert(alertText);
    }
    return(
        <>
        </>
    )
}