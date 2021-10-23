import React, { useEffect } from'react';
import { ApolloClient, useApolloClient, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet-async';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { Link } from 'react-router-dom';
import { ShareMusle } from '../../component/sharemusles';
import { myShareMusles } from '../../api/myShareMusles';

export const MY_SHAREMUSLES = gql`
 query myShareMusles{
    myShareMusles{
        ok
        error
        shareMusles{
            ...ShareMusleParts
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
`

export const MyShareMusles = () => {
    const {data} = useQuery<myShareMusles>(MY_SHAREMUSLES);
    return(
        <div className='h-screen lg:bg-gray-600 px-5'>
            <div><Helmet><title>My ShareMusles | XON</title></Helmet></div>
            <div className='max-w-screen-2xl mx-auto lg:bg-gray-600 py-2 lg:px-5 lg:pt-16'>
                <h2 className='lg:text-white text-3xl lg:text-4xl font-semibold'>My ShareMusles</h2>
                {data?.myShareMusles.ok && data.myShareMusles.shareMusles.length === 0 ? (
                    <>
                    <h4 className='lg:text-white mt-5 text-xl'>You have no shareMusles.</h4>
                    <Link to='/add-shareMusle'>
                        <div className='lg:text-yellow-200 text-lime-600 hover:underline mt-5'>Click To Create Your ShareMusle! &rarr;</div>
                    </Link>
                    </>
                ):(
                    <div className='grid lg:grid-cols-4 gap-x-5 gap-y-10 mt-6 lg:mt-10 grid-cols-1'>
                        {data?.myShareMusles.shareMusles.map((shareMusle) => (
                            <ShareMusle
                            key={shareMusle.id + ""}
                            id={shareMusle.id + ""}
                            coverImg={shareMusle.coverImg}
                            name={shareMusle.name}
                            countryName={shareMusle.country?.name + ""}
                            address={shareMusle.address}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>        
    )
}