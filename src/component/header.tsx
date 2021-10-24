import React from 'react';
import { faGg } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useMe } from '../usehook/useMe';
export const Header = () =>{
   /* useEffect(() => {
        const sayHi=()=>{
            alert('XON AI finished your email!');
        }
        setTimeout(sayHi, 10000);
    },[])*/
    const {data} = useMe();
    return(
        <>
        {!data?.me.verified && (
            <div className='bg-yellow-50 flex justify-center py-3 items-center'>
                <span className='text-blue-600 text-xs font-semibold'>
                    XON AI is checking your email
                    </span>
            </div>
        )}
        <div className='lg:bg-gray-700'>
            <div className='w-full flex justify-between items-center lg:text-white max-w-screen-3xl mx-auto py-4 px-5 lg:px-10'>
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
/*
<Link to='/confirm'>
<span className='text-blue-600 text-xs font-semibold'>
                    Please check your Email
                    </span>
</Link>*/