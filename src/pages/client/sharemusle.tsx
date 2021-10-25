import React, { useState } from'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { DISH_FRAGMENT, SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { shareMusle, shareMusleVariables } from '../../api/shareMusle';
import { Dish } from '../../component/dish';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CreateOrderItemInput } from '../../api/globalTypes';

const SHAREMUSLE_QUERY = gql`
 query shareMusle($input: ShareMusleInput!){
    shareMusle(input: $input){
        ok
        error
        shareMusle{
            ...ShareMusleParts
            menu{
                ...DishParts
            }
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
 ${DISH_FRAGMENT}
`

const CREATE_ORDER_MUTATION = gql`
mutation createOrder($input: CreateOrderInput!){
    createOrder(input:$input){
        ok
        error
    }
 }
`

interface IParams{
    id: string
}

export const ShareMusle = () => {
    const params = useParams<IParams>();
    const {data} = useQuery<shareMusle, shareMusleVariables>(SHAREMUSLE_QUERY,{
        variables:{
            input:{
                shareMusleId: +params.id
            }
        }
    })
    const [orderStart, setOrderStart] = useState(false);
    const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
    const onTrigger = () => {
        setOrderStart(true);
    }
    const addItemsToOrder = (dishId: number) => {
        setOrderItems((current) => [{dishId},...current])
    }
    console.log(orderItems);
    
    return(
        <div>
            <Helmet><title>{`${data?.shareMusle.shareMusle?.name} | XON`}</title></Helmet>
            <div className='h-screen lg:bg-gray-600'>
                <div className='lg:bg-gray-600'>
                    <div className=' max-w-screen-2xl py-2 flex justify-center mx-auto lg:bg-gray-600'>
                        <div className='grid lg:grid-cols-3 w-full lg:bg-gray-600 px-5'>
                            <div className='bg-red-500 bg-cover bg-center mt-3 lg:mt-10 py-32 lg:py-60 rounded-2xl'
                            style={{backgroundImage:`url(${data?.shareMusle.shareMusle?.coverImg})`}}></div>
                            <div className='flex flex-col lg:text-white justify-center lg:bg-gray-600 rounded-xl py-5'>
                                <div className='lg:pl-20'>
                                    <h4 className='font-semibold text-2xl lg:text-4xl mb-4'>{data?.shareMusle.shareMusle?.name}</h4>
                                      <div className='text-left flex flex-col gap-y-2'>
                                        <h5 className='font-normal text-base lg:text-2xl'>01051741436</h5>
                                        <h6 className='font-normal text-base lg:text-2xl'>{data?.shareMusle.shareMusle?.address}</h6>
                                        <h6 className='font-normal text-base lg:text-2xl'>{data?.shareMusle.shareMusle?.country?.name}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:bg-gray-600'>
                    <div className='max-w-screen-2xl lg:text-white mx-auto px-5 lg:mt-10 mt-8 pb-20'>
                        <h1 className='lg:text-3xl text-xl lg:font-medium mb-5 lg:mb-8'>Service</h1>
                        <div className='flex justify-end lg:pb-10 pb-5 text-white'>
                            <button 
                            onClick={onTrigger}
                            className='bg-lime-500 w-full lg:w-min text-xl rounded-lg px-5 py-2 font-normal focus:outline-none'>
                                <FontAwesomeIcon icon={faShoppingCart}/>
                            </button>
                        </div>
                        <div className='grid lg:grid-cols-3 gap-x-5 gap-y-3'>
                            {data?.shareMusle.shareMusle?.menu.map((dish) => (
                                <Dish
                                id={dish.id}
                                addItemsToOrder={addItemsToOrder}
                                orderStart={orderStart}
                                key={dish.id + ""}
                                name={dish.name}
                                price={dish.price + ""}
                                description={dish.description}
                                options={dish.options}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}