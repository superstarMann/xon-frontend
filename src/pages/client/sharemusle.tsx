import React from 'react';
import { useMe } from '../../usehook/useMe';

export const ShareMusles = () => {
    const {data} = useMe()
    return(
        <div>
        <h1>{data?.me.email}</h1>
        </div>
    )
    }