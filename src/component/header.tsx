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
    //!data.me.verified 로 나중에 변경
    const {data} = useMe();
    return(
        <>
        {data?.me.verified && (
            <div className='bg-yellow-50 flex justify-center py-3 items-center'>
                <span className='text-blue-600 text-xs font-semibold'>
                    XON AI is checking your email
                    </span>
            </div>
        )}
        <div className='lg:bg-pink-300'>
            <div className='w-full flex justify-between items-center lg:text-white max-w-screen-3xl mx-auto py-2 px-5 lg:px-10'>
                <Link to='/'>
                   <FontAwesomeIcon icon={faGg} className='text-2xl text-pink-700'/>
                </Link>
                <Link to='/edit-profile' className='bg-pink-700 px-3 py-1 rounded-2xl'>
                   <FontAwesomeIcon icon={faUser} className='text-xl'/>
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