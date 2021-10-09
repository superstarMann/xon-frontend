import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { shareMuslesPageQuery, shareMuslesPageQueryVariables } from '../../api/shareMuslesPageQuery';


const SHAREMUSLES_QUERY = gql`
 query shareMuslesPageQuery($input: ShareMuslesInput!){
    allCountries{
        ok
        error
        countries{
            id
            name
            coverImg
            slug
            shareMusleCount
        }
    }
    allShareMusle(input: $input){
        ok
        error
        totalResults
        totalPages
        results{
            id
            name
            address
            coverImg
            country{
                name
            }
            isPromoted
        }
    }
 }
`

export const ShareMusles = () => {
    const {data, loading} = useQuery<shareMuslesPageQuery, shareMuslesPageQueryVariables>(SHAREMUSLES_QUERY,{
        variables:{
            input:{
                page: 1
            }
        }
    })
    return(
        <div className='lg:bg-gray-600 h-screen'>
                <form className='flex w-full justify-center items-center py-16 lg:py-28 bg-gray-100 lg:bg-gray-600'>
                    <input 
                    type="search" 
                    placeholder='Search ShareMusles...'
                    className='rounded-lg text-center border-2 lg:border-0 py-3 px-5 w-9/12 lg:w-3/12 focus:outline-none focus:ring-indigo-600 focus:ring-opacity-40'
                    />
                </form>
                {!loading && (
                  <div className='max-w-screen-2xl mx-auto px-5 py-5 lg:py-0 '>
                    <div className='overflow-x-auto'>
                    <div className='flex justify-evenly max-w-xs lg:max-w-screen-sm mx-auto '>
                        {data?.allCountries.countries?.map((country) => (
                            <div className='flex flex-col items-center cursor-pointer hover:opacity-60 transition'>
                                <div
                                style={{backgroundImage:`url(${country.coverImg})`}}
                                className='bg-cover w-16 h-16 rounded-full text-center'
                                ></div>
                                <span className='mt-1 text-sm text-center font-medium lg:text-white'>
                                    {country.name}
                                </span>
                            </div>
                        ))}
                    </div>
                    </div>
                  </div>
                )}
        </div>
    )
    }