import React, { useState } from'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { DISH_FRAGMENT, SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useHistory, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { shareMusle, shareMusleVariables } from '../../api/shareMusle';
import { Dish } from '../../component/dish';
import { CreateOrderItemInput } from '../../api/globalTypes';
import { DishOption } from '../../component/dishOption';
import { createOrder, createOrderVariables} from '../../api/createOrder'

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
        orderId
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
    const [orderStarted, setOrderStarted] = useState(false)
    const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([])
    const onTriggerOrder = () => {
        setOrderStarted(true)
    }
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
    const addOptionToItem = (dishId: number, optionName: any) => {
        if(!isSelected(dishId)){
            return
        }
        const oldItem = getItem(dishId);
        if(oldItem){
            const hasOption = Boolean(oldItem.options?.find((aOption) => aOption.name == optionName))
            if(!hasOption){
                removeOrder(dishId);
                setOrderItems((current) => [{dishId, options: [{name: optionName}, ...oldItem.options!]}, ...current])
            }
        }
    }
    const removeOptionFormItem = (dishId: number, optionName: string) => {
        if(!isSelected){
            return;
        }
        const oldItem = getItem(dishId);
        if(oldItem){
            removeOrder(dishId);
            setOrderItems(
                (current) => [
                    {dishId, options: oldItem.options?.filter((option) => option.name !== optionName)}, ...current]);
            return
        }
    }
    const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
        return item.options?.find((option) => option.name == optionName);
    }
    const isOptionSelected = (dishId: number, optionName: string) => {
        const item = getItem(dishId);
        if(item){
            return Boolean(getOptionFromItem(item, optionName));
        }
        return false
    }
    const onCancelOrder = () => {
        setOrderStarted(false)
        setOrderItems([]);
    }
    const history = useHistory();
    const onCompleted = (data: createOrder) => {
        const {createOrder :{ok, orderId}} = data;
        if(ok){
            alert('Well done!')
            history.push(`/orders/${orderId}`)
        }
    }
    const [createOrderMutation, {loading}] = useMutation<createOrder, createOrderVariables>(CREATE_ORDER_MUTATION,
        {onCompleted})

    const onConfirmBtn = () => {
        if(loading){
            return
        }
        if(orderItems.length === 0 ) {
            alert(`Can't place empty order`)
            return
        }
        const ok = window.confirm('You are about to place an order');
        if(ok){
            createOrderMutation({
                variables:{
                    input:{
                        shareMusleId: +params.id,
                        items: orderItems
                    }
                }
            })            
        }
    }
   
    return(
        <div>
            <Helmet><title>{`${data?.shareMusle.shareMusle?.name} | XON`}</title></Helmet>
            <div className='h-screen lg:bg-gray-700 '>
                <div className='lg:bg-gray-700  lg:px-16'>
                    <div className=' max-w-screen-2xl py-2 flex justify-center mx-auto lg:bg-gray-700'>
                        <div className='grid lg:grid-cols-3 w-full lg:bg-gray-700 px-10'>
                            <div className='bg-red-500 bg-cover bg-center lg:mt-10 py-40 lg:py-60 rounded-2xl'
                            style={{backgroundImage:`url(${data?.shareMusle.shareMusle?.coverImg})`}}></div>
                            <div className='flex flex-col lg:text-white lg:bg-gray-700 rounded-xl py-5 justify-end'>
                                <div className='lg:pl-20'>
                                    <h4 className='font-semibold text-2xl lg:text-4xl mb-4'>{data?.shareMusle.shareMusle?.name}</h4>
                                      <div className='text-left flex flex-col gap-y-2'>
                                        <h5 className='font-normal text-base lg:text-2xl'>Phone: 01051741436</h5>
                                        <h6 className='font-normal text-base lg:text-2xl'>Adress: {data?.shareMusle.shareMusle?.address}</h6>
                                        <h6 className='font-normal text-base lg:text-2xl'>Country: {data?.shareMusle.shareMusle?.country?.name}</h6>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                    <div className=' lg:px-24 max-w-screen-2xl lg:bg-gray-700 lg:text-white mx-auto px-5 lg:mt-10 pb-20'>
                        <h1 className='lg:text-3xl text-xl lg:font-medium'>Service</h1>
                        <div className='flex flex-col items-end pb-5 text-lg text-white mt-3 '>
                        {!orderStarted && (
                            <button onClick={onTriggerOrder} className='bg-lime-500 rounded-lg lg:px-5 py-2 w-full lg:w-max'>
                                Start Order
                            </button>
                        )}
                        {orderStarted && (
                            <div className=' flex flex-col lg:flex-row lg:justify-end w-full'>
                                <button 
                                onClick={onConfirmBtn} 
                                className='bg-lime-500 rounded-lg px-5 py-2 lg:mr-4 mb-2'>
                                Confirm Order
                                </button>
                                <button 
                                onClick={onCancelOrder}
                                className='bg-red-500 rounded-lg px-5 py-2 lg:mb-2'>
                                    Cancel Order
                                </button>
                            </div>
                        )}
                        </div>
                        
                        <div className='lg:bg-gray-700'>
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
                                orderStarted={orderStarted}
                                >
                                {dish.options?.map((option, index) => (
                                    <DishOption
                                    key={index}
                                    extra={option.extra}
                                    name={option.name}
                                    dishId={dish.id}
                                    addOptionToItem={addOptionToItem}
                                    isSelected={isOptionSelected(dish.id, option.name)}
                                    removeOptionFormItem={removeOptionFormItem}
                                    />
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

 /*<div className='text-white'>
    <div className='bg'>Description</div>
    <div>License</div>
    <div>Hobby</div>
</div>
    */