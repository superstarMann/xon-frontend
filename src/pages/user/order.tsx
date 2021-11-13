import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { getOrder, getOrderVariables } from '../../api/getOrder';

const GET_ORDER_QUERY = gql`
 query getOrder($input: GetOrderInput!){
    getOrder(input: $input){
        ok
        error
        order{
            id
            status
            total
            driver{
                email
            }
            customer{
                email
            }
            shareMusle{
                name
            }
        }
    }
 }
`

interface IProps{
    id: string;
}

export const Order = () => {
    const params = useParams<IProps>()
    const {data} = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
        variables:{
            input:{
                id: +params.id
            }
        }
    })
    
    
    return(
        <div className='h-screen lg:bg-gray-700 flex flex-col lg:justify-center items-center'>
            <div className='w-full max-w-screen-sm lg:text-white mt-12 px-5'>
                <div className='rounded-lg border-2 border-gray-300 flex flex-col justify-center items-center'>
                    <div className='border-b-2 text-xl text-center py-4 w-full bg-pink-700 text-white'>
                        Order #{data?.getOrder.order?.id}
                    </div>
                    <div className='px-5 w-full text-left'>
                        <div className='py-8 text-3xl border-b-2 text-center'>
                            ${data?.getOrder.order?.total}
                        </div>
                        <div className='py-5 border-b-2 text-sm'>
                        <span>Prepared By:</span>{" "}
                        <span className='text-xl'>Real One</span>
                        </div>
                        <div className='py-5 border-b-2 text-sm'>
                            <span>Guader To:</span>{" "}
                            <span className='text-xl'>{data?.getOrder.order?.customer?.email}</span>
                        </div>
                        <div className='py-8 text-base text-center'>
                            <span>Guader Status:</span>{" "}
                            <span className='text-xl text-lime-500'>{data?.getOrder.order?.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}