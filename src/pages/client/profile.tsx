import React from 'react';
import { isLoggedInVar } from '../../apollo';
import { LOCALSTORAGE_TOKEN } from '../../constant';

export const Profile = () => {
    const onClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN)
    }

    return(
        <div>
           <div>Profile</div>
           <button onClick={onClick}>Log Out</button>
        </div>
    )
}