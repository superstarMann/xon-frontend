import React from'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { shareMusle, shareMusleVariables } from '../../api/shareMusle';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';

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
     </div>
    )
}
