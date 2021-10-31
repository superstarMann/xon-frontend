import React, { useState } from'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { DISH_FRAGMENT, SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { shareMusle, shareMusleVariables } from '../../api/shareMusle';
import { Dish } from '../../component/dish';
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

    const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([])
    const getItem = (dishId: number) => {
        return orderItems.find((order) => order.dishId === dishId);
    }
    const isSelected = (dishId:number) => {
        return Boolean(getItem(dishId));
    }
    const addItemToOrder = (dishId: number) => {
        if(isSelected(dishId)){
            return;
        }
        setOrderItems((current) => [{dishId, options: []}, ...current])
    }
    const removeOrder = (dishId: number) => {
        setOrderItems((current) => current.filter((order) => order.dishId !== dishId))
    }
    const addOptionToItem = (dishId: number, option: any) => {
        if(!isSelected(dishId)){
            return
        }
        const oldItem = getItem(dishId);
        if(oldItem){
            removeOrder(dishId)
            setOrderItems((current) => [{dishId, options: [option, ...oldItem.options!]}, ...current])
        }
    }

    console.log(orderItems)
    return(
        <div>
            <Helmet><title>{`${data?.shareMusle.shareMusle?.name} | XON`}</title></Helmet>
            <div className='h-screen lg:bg-gray-600'>
                <div className='lg:bg-gray-600'>
                    <div className=' max-w-screen-2xl py-2 flex justify-center mx-auto lg:bg-gray-600'>
                        <div className='grid lg:grid-cols-3 w-full lg:bg-gray-600 px-5'>
                            <div className='bg-red-500 bg-cover bg-center mt-3 lg:mt-10 py-40 lg:py-60 rounded-2xl'
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
                        <h1 className='lg:text-3xl text-xl lg:font-medium'>Service</h1>
                        <div className='flex justify-end lg:pb-10 pb-5 text-white'>
                        </div>
                        <div className='grid lg:grid-cols-3 gap-x-5 gap-y-3'>
                            {data?.shareMusle.shareMusle?.menu.map((dish) => (
                            <Dish
                                id={dish.id}
                                key={dish.id + ""}
                                name={dish.name}
                                price={dish.price + ""}
                                description={dish.description}
                                options={dish.options}
                                isSelected={isSelected(dish.id)}
                                addItemToOrder={addItemToOrder}
                                removeOrder={removeOrder}
                                >
                                {dish.options?.map((option,index) => (
                                    <div key={index} className='flex items-center'
                                        onClick={
                                           () => addOptionToItem ? addOptionToItem(dish.id, {name: option.name}): null
                                        }>
                                        <h5 className='mr-2'>{option.name}</h5>
                                        <h6 className='text-sm opacity-75'>(${option.extra})</h6>
                                    </div>
                                ))}
                            </Dish>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}