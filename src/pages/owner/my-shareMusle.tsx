import React from 'react';
import gql from 'graphql-tag';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useQuery } from '@apollo/client';
import { myshareMusle, myshareMusleVariables } from '../../api/myshareMusle';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const MYSHAREMUSLE = gql`
 query myshareMusle($input: ShareMusleInput!){
    shareMusle(input: $input){
        ok
        error
        shareMusle{
            ...ShareMusleParts
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
`

interface IParamsProps{
    id: string;
}

export const MyshareMusle = () => {
    const {id} = useParams<IParamsProps>()
    const {data} = useQuery<myshareMusle, myshareMusleVariables>(MYSHAREMUSLE,{
        variables:{
            input:{
                shareMusleId: +id
            }
        }
    });

    return(
        <div className='lg:bg-gray-600 h-screen'>
            <div className='max-w-screen-2xl px-5 lg:mx-auto pt-6 lg:py-10 lg:pt-20 grid lg:grid-cols-2 grid-cols-1'>
                <div className='lg:grid-cols-2 grid gap-5'>
                    <div 
                    style={{backgroundImage: `url(${data?.shareMusle.shareMusle?.coverImg})`}}
                    className='bg-yellow-300 py-48 rounded-lg bg-cover bg-center'></div>
                    <div className='lg:text-white lg:px-10 flex flex-col justify-center lg:gap-y-4 gap-y-2'>
                       <h2 className='font-semibold text-2xl lg:text-4xl mb-3'>{data?.shareMusle.shareMusle?.name}</h2>
                       <h4 className='font-normal text-base lg:text-2xl'>Adress : {data?.shareMusle.shareMusle?.address}</h4>
                       <h4 className='font-normal text-base lg:text-2xl'>Country : {data?.shareMusle.shareMusle?.country?.name}</h4>
                       <h4 className='font-normal text-base lg:text-2xl'>Phone : +01015125351</h4>
                    </div>
                </div>
                <div className='flex flex-col justify-center text-white gap-y-4 items-center mt-6 lg:mb-6'>
                    <div className='flex lg:gap-x-5 gap-x-3'>
                    <div><Link className='bg-green-500 text-sm lg:text-lg font-medium px-5 py-2' to={''}>Add Service &rarr;</Link></div>
                    <div><Link className='bg-red-500 text-sm lg:text-lg font-medium px-5 py-2' to={''}>Buy Promotion &rarr;</Link></div>
                    </div>
                </div>
                <div className='flex flex-col mt-5'>
                    <h1 className='text-lg lg:text-4xl lg:text-white'>My Service</h1>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}