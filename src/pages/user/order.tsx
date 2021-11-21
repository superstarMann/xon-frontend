import React, { useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import gql from 'graphql-tag';
import { useHistory, useParams } from 'react-router';

import { Helmet } from 'react-helmet-async';
import { ORDER_FULL_FRAGMENT } from '../../fragments';
import { updateOrders } from '../../api/updateOrders';
import { useMe } from '../../usehook/useMe';
import { deleteOrder, deleteOrderVariables } from '../../api/deleteOrder';
import { editOrder, editOrderVariables } from '../../api/editOrder';
import { getOrder, getOrderVariables } from '../../api/getOrder';
import { OrderStatus, UserRole } from '../../api/globalTypes';
import { DashBoard } from '../../component/dashboard';


const GET_ORDER_QUERY = gql`
 query getOrder($input: GetOrderInput!){
    getOrder(input: $input){
        ok
        error
        order{
            ...OrderFull
        }
    }
 }
 ${ORDER_FULL_FRAGMENT}
`

const ORDER_SUBSCRIPTION = gql`
 subscription updateOrders($input: UpdateOrderInput!){
    updateOrders(input: $input){
        ...OrderFull
    }
 }
 ${ORDER_FULL_FRAGMENT}
`

const DELETE_ORDER = gql`
 mutation deleteOrder($input: DeleteOrderInput!){
     deleteOrder(input: $input){
        ok
        error
     }
 }
`

const EDIT_ORDER = gql`
 mutation editOrder($input: EditOrderInput!){
     editOrder(input: $input){
         ok
         error
     }
 }
`

interface IProps{
    id: string;
}

export const Order = () => {
    const params = useParams<IProps>()
    const history = useHistory();
    const {data: userData} = useMe();
    const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(EDIT_ORDER)
    const {data, subscribeToMore} = useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, {
        variables:{
            input:{
                id: +params.id
            }
        }
    })
    const onCompleted = (data: deleteOrder) => {
        const {deleteOrder: {ok}} = data
        if(ok){
            history.goBack()
        }
    }
    const [deleteMutation] = useMutation<deleteOrder, deleteOrderVariables>(DELETE_ORDER,{
        onCompleted
    })
    const onClick = () => {
        deleteMutation({
            variables:{
                input:{
                    orderId: +params.id
                }
            }
        })
    }

    useEffect(() => {
        if(data?.getOrder.ok){
            subscribeToMore({
                document: ORDER_SUBSCRIPTION,
                variables:{
                    input:{
                        id: +params.id
                    }
                },
                updateQuery:(prev, {subscriptionData: {data}}: {subscriptionData: {data: updateOrders}}) => {
                    if(!data) return prev;
                    return{
                        getOrder:{
                            ...prev.getOrder,
                            order:{
                                ...data.updateOrders
                            }
                        }
                    }
                }
            })
        }
    },[data])

    const onBtnClick = (newStatus: OrderStatus) => {
        editOrderMutation({
            variables:{
                input:{
                    id: +params.id,
                    status: newStatus
                }
            }
        })
    }
    
    return(
        <div className='h-screen lg:bg-gray-700 flex flex-col lg:justify-center items-center'>
            <Helmet><title>{`Order #${data?.getOrder.order?.id} | XON`}</title></Helmet>
            <div className='w-full max-w-screen-xl lg:text-white lg:mt-12 mt-2 px-5 grid lg:grid-cols-2 gap-y-5 lg:gap-x-5'>
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
                        <span className='text-xl'>{data?.getOrder.order?.shareMusle?.name}</span>
                        </div>
                        <div className='py-5 border-b-2 text-sm'>
                            <span>Guader To:</span>{" "}
                            <span className='text-xl'>{data?.getOrder.order?.customer?.email}</span>
                        </div>
                        <div className='py-8 text-base text-center'>
                            <span>Guader Status:</span>{" "}
                            <span className='text-xl text-lime-500'>{data?.getOrder.order?.status}</span>   
                        </div>
                        {userData?.me.role === UserRole.User &&
                         data?.getOrder.order?.status !== OrderStatus.Arrived &&(
                        <div className='pb-10 text-base text-center'>
                           <button onClick={onClick} className='bg-red-500 text-sm lg:text-lg font-medium px-5 py-2'>Canncel Order</button>
                        </div>
                        )}
                        {userData?.me.role === UserRole.Guader && (
                            <>
                            {data?.getOrder.order?.status === OrderStatus.Pending && (
                                <div className='pb-10 text-base text-center'>
                                <button 
                                onClick={() => onBtnClick(OrderStatus.Going)}
                                className='bg-lime-500 text-sm lg:text-lg font-medium px-5 py-2 mr-2'>Accept Order</button>
                                <button onClick={onClick} className='bg-red-500 text-sm lg:text-lg font-medium px-5 py-2'>Canncel Order</button>
                                </div>
                            )}
                            {data?.getOrder.order?.status === OrderStatus.Going && (
                                <div className='pb-10 text-base text-center'>
                                <button 
                                onClick={() => onBtnClick(OrderStatus.Protecting)}
                                className='bg-lime-500 text-sm lg:text-lg font-medium px-5 py-2 mr-2'>Protecting Customer</button>
                                <button onClick={onClick} className='bg-red-500 text-sm lg:text-lg font-medium px-5 py-2'>Canncel Order</button>
                                </div>
                            )}
                            {data?.getOrder.order?.status === OrderStatus.Protecting && (
                                <div className='pb-10 text-base text-center'>
                                <button 
                                onClick={() => onBtnClick(OrderStatus.Arrived)}
                                className='bg-lime-500 text-sm lg:text-lg font-medium px-5 py-2 mr-2'>Destination Arrived</button>
                                </div>
                            )}                            
                            </>
                        )}
                    </div>
                </div>
                <DashBoard/>
            </div>
        </div>
    )
}