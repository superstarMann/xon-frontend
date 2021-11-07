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
        <div>
            <div>{data?.getOrder.order?.shareMusle?.name}</div>
            {data?.getOrder.order?.total}
        </div>
    )
}