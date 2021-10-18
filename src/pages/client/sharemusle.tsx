import React from'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { shareMusle, shareMusleVariables } from '../../api/shareMusle';

const SHAREMUSLE_QUERY = gql`
 query shareMusle($input: ShareMusleInput!){
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

interface IParams{
    id: string
}

//수정필요

export const ShareMusle = () => {
    const params = useParams<IParams>();
    const {data, loading} = useQuery<shareMusle, shareMusleVariables>(SHAREMUSLE_QUERY,{
        variables:{
            input:{
                shareMusleId: +params.id
            }
        }
    })

    return(
        <div>
            <Helmet><title>{`${data?.shareMusle.shareMusle?.name} | XON`}</title></Helmet>
            <div className='h-screen'>
                <div className='lg:bg-gray-600'>
                    <div className=' max-w-screen-xl py-2 flex justify-center mx-auto lg:bg-gray-600'>
                        <div className='grid lg:grid-cols-2 w-full lg:grid-rows-2 lg:bg-gray-600 px-5'>
                            <div className='bg-red-500 bg-cover bg-center my-5 lg:mt-10 py-32 lg:py-60 rounded-2xl'
                            style={{backgroundImage:`url(${data?.shareMusle.shareMusle?.coverImg})`}}></div>
                            <div className='flex flex-col lg:text-white items-center justify-center lg:bg-gray-600 rounded-xl py-5'>
                                <div className='grid grid-rows-1'>
                                <div className='w-full text-center lg:mb-5'>
                                  <h4 className='lg:text-4xl text-center text-2xl font-medium mb-3'>{data?.shareMusle.shareMusle?.name}</h4>
                                </div>
                                  <div className='text-left'>
                                    <h5 className='lg:text-2xl text-xl font-light mb-3'>01051741436</h5>
                                    <h6 className='lg:text-xl text-base font-light mb-3'>{data?.shareMusle.shareMusle?.address}</h6>
                                    <h6 className='lg:text-lg text-sm font-light '>{data?.shareMusle.shareMusle?.country?.name}</h6>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*
     <div>
         <Helmet><title>{`${data?.shareMusle.shareMusle?.name} | XON`}</title></Helmet>
         <div className='h-screen lg:bg-gray-600'>
            <div 
            style={{backgroundImage: `url(${data?.shareMusle.shareMusle?.coverImg})`}}
            className=" bg-gray-800 bg-center bg-cover py-48" >
                <div className='bg-white w-3/12 py-8 pl-48'>
                    <h4 className='text-4xl mb-3'>{data?.shareMusle.shareMusle?.name}</h4>
                    <h5 className='text-sm font-light mb-2'>{data?.shareMusle.shareMusle?.country?.name}</h5>
                    <h6 className='text-sm font-light'>전화번호</h6>
                    <h6 className='text-sm font-light'>{data?.shareMusle.shareMusle?.address}</h6>
                </div>
            </div>
         </div>
     </div>*/
