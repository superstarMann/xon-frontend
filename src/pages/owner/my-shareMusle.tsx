import React from 'react';
import gql from 'graphql-tag';
import { DISH_FRAGMENT, ORDER_FRAGMENT, SHAREMUSLE_FRAGMENT } from '../../fragments';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { myShareMusle, myShareMusleVariables } from '../../api/myShareMusle';
import { Helmet } from 'react-helmet-async';
import { Dish } from '../../component/dish';
import { VictoryChart, VictoryAxis, VictoryVoronoiContainer, VictoryLine, VictoryLabel, VictoryTooltip } from 'victory'

export const MY_SHAREMUSLE_QUERY = gql`
 query myShareMusle($input: MyShareMusleInput!){
    myShareMusle(input: $input){
        ok
        error
        shareMusle{
            ...ShareMusleParts
            menu{
                ...DishParts
            }
            orders{
                ...OrderParts
            }
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
 ${DISH_FRAGMENT}
 ${ORDER_FRAGMENT}
`

interface IParamsProps{
    id: string;
}

export const MyshareMusle = () => {
    const {id} = useParams<IParamsProps>()
    const {data} = useQuery<myShareMusle, myShareMusleVariables>(MY_SHAREMUSLE_QUERY,{
        variables:{
            input:{
                id: +id
            }
        }
    })

    return(
        <div className='lg:bg-gray-600 h-screen'>
            <Helmet><title>My ShareMusle | XON</title></Helmet>
            <div className='max-w-screen-2xl px-5 lg:mx-auto pt-3 lg:py-10 lg:pt-20 grid lg:grid-cols-2 grid-cols-1'>
                <div className='lg:grid-cols-2 grid gap-5'>
                    <div 
                    style={{backgroundImage: `url(${data?.myShareMusle.shareMusle?.coverImg})`}}
                    className='bg-yellow-300 py-48 rounded-lg bg-cover bg-center'></div>
                    <div className='lg:text-white lg:px-10 flex flex-col justify-center lg:gap-y-4 gap-y-2'>
                       <h2 className='font-semibold text-2xl lg:text-4xl'>{data?.myShareMusle.shareMusle?.name}</h2>
                       <h4 className='font-normal text-base lg:text-2xl'>Adress : {data?.myShareMusle.shareMusle?.address}</h4>
                       <h4 className='font-normal text-base lg:text-2xl'>Country : {data?.myShareMusle.shareMusle?.country?.name}</h4>
                       <h4 className='font-normal text-base lg:text-2xl'>Phone : +01015125351</h4>
                    </div>
                </div>
                <div className='flex flex-col justify-center text-white gap-y-4 items-center mt-6 lg:mb-6'>
                    <div className='flex lg:gap-x-5 gap-x-3'>
                       <div><Link className='bg-green-500 text-sm lg:text-lg font-medium px-5 py-2' to={`/shareMusle/${id}/add-service`}>Add Service &rarr;</Link></div>
                       <div><Link className='bg-red-500 text-sm lg:text-lg font-medium px-5 py-2' to={''}>Buy Promotion &rarr;</Link></div>
                    </div>
                  </div> 
                </div>
                <div className='lg:mt-10 mt-8 lg:text-white'>
                    {data?.myShareMusle.shareMusle?.menu.length === 0 ? (
                        <h4 className='lg:text-3xl text-xl lg:font-medium'>Please Upload Your Service!</h4>
                    ): (<div className='max-w-screen-2xl px-5 mx-auto'>
                        <h1 className='lg:text-3xl text-xl lg:font-medium mb-5 lg:mb-8'>My Services</h1>
                          <div className='grid lg:grid-cols-3 max-w-screen-2xl mx-auto gap-y-3 gap-x-5'>
                          {data?.myShareMusle.shareMusle?.menu.map((dish) => (
                            <Dish
                            key={dish.id + ""}
                            name={dish.name}
                            description={dish.description}
                            price={dish.price + ""}
                            />
                          ))}
                          </div>
                    </div>)}
                </div>
                <div className='lg:bg-gray-600 pb-20'>
                <div className='max-w-screen-2xl px-5 mx-auto mt-10 lg:text-white'>
                    {data?.myShareMusle.ok ? (
                    <h1 className='text-center font-medium text-lg'>
                        A new technology will be updated soon...
                    </h1>) : (<div>
                        <h1 className='text-center font-medium text-4xl pt-10'>Average Sales</h1>
                    <div className='mt-5'>
                        <VictoryChart 
                        domainPadding={50}
                        height={500} 
                        width={window.innerWidth} 
                        containerComponent={<VictoryVoronoiContainer/>}>
                            <VictoryLine 
                            labels={(datum) => `$${Math.floor(datum.y)}`}
                            labelComponent={<VictoryTooltip style={{fontSize:18}} renderInPortal dy={-20}/>}
                            data={data?.myShareMusle.shareMusle?.orders.map((order) => ({
                                x: order.createdAt,
                                y: order.total
                            }))}
                            interpolation='linear'
                            style={{data: {strokeWidth: 5, stroke: "#40FFE0"}}}/>
                            <VictoryAxis 
                            tickLabelComponent={<VictoryLabel renderInPortal/>}
                            style={{
                                tickLabels:{
                                    fontSize: 20
                                }
                            }}
                            tickFormat={(tick) => new Date(tick).toLocaleDateString()}
                            />
                        </VictoryChart>
                    </div>
                    </div>)}
                </div>
                </div>
        </div>   
    )
}