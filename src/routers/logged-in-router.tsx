import React from 'react';
import { isLoggedInVar } from '../apollo';

export const LoggedInRouter = () => {

    const onClick = () => {
        isLoggedInVar(false)
    }

    return(
        <div className='mx-auto max-w-screen-md'>
        <h1>Logged In Screen</h1>
        <button onClick={onClick}>Click</button>
        </div>
    )
}
