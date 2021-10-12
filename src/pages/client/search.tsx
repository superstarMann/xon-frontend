import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { searchShareMusles, searchShareMuslesVariables } from '../../api/searchShareMusles';
import { ShareMusle } from '../../component/sharemusles';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { IProps } from './sharemusles';

const SEARCH_QUERY = gql`
 query searchShareMusles($input: SearchShareMusleInput!){
    searchShareMusle(input: $input){
        ok
        error
        totalPages
        totalResults
        shareMusles{
            ...ShareMusleParts
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
`

export const Search = () => {
    const location = useLocation();
    const history = useHistory();
    const [page, setPage] = useState(1);
    const [callQuery, {data}] = useLazyQuery<searchShareMusles, searchShareMuslesVariables>(SEARCH_QUERY);
    useEffect(() => {
        const [_, query] = location.search.split('?term=')
        if(!query){
            history.replace('/');
        }
        callQuery({
            variables:{
                input:{
                    page,
                    query
                }
            }
        })
    }, [history, location])
    const {register, getValues, handleSubmit} = useForm<IProps>()
    const onSearch = () => {
        const {searchTerm} = getValues();
        history.push({
            pathname:'/search',
            search:`?term=${searchTerm}`
        })
    }
    const onNextPageClick = () => setPage(current => current + 1);
    const onPrevPageClick = () => setPage(current => current - 1);
   return(
        <div className='h-screen lg:bg-gray-600'>
            <Helmet><title>search | XON</title></Helmet>
            <form 
               onSubmit={handleSubmit(onSearch)}
               className='flex w-full justify-center items-center py-16 lg:py-28 bg-gray-100 lg:bg-gray-600'
                      >
                    <input
                    {...register('searchTerm', {minLength:1})}
                    type="search" 
                    placeholder='Search ShareMusles...'
                    className='searchInput'
                    />
            </form>
           {Boolean(data?.searchShareMusle.totalResults) ? (
           <div className='lg:bg-gray-600'>
            <div className='max-w-screen-2xl mx-auto px-5 pb-20 lg:bg-gray-600 mt-10'>
                <div className='grid lg:grid-cols-4 grid-cols-1 gap-x-5 gap-y-10 '>
                    {data?.searchShareMusle.shareMusles?.map((shareMusle) => (
                        <ShareMusle 
                        address={shareMusle.address}
                        key={shareMusle.id + ''}
                        id={shareMusle.id + ''}
                        name={shareMusle.name}
                        coverImg={shareMusle.coverImg}
                        countryName={shareMusle.country?.name + ""}
                        />
                    ))}
                </div>
                <div className='grid max-w-sm grid-cols-3 mx-auto text-center lg:text-white mt-10 lg:bg-gray-600'>
                    {page > 1 ? (
                        <button onClick={onPrevPageClick}>&larr;</button>
                    ) : (<div></div>)}
                    <span className='text-sm'>The Page {page}</span>
                    {page === data?.searchShareMusle.totalPages ? (
                        <button onClick={onNextPageClick}>&rarr;</button>
                    ) : (
                        <div></div>
                    )}
                </div>
                </div>
                </div>
       ):(
           <div className='max-w-screen-2xl mx-auto flex justify-center text-center mt-20'>
               <div className='flex flex-col'>
                  <h2 className='text-2xl lg:text-white'>No search results found...😘</h2>
               </div>
            </div>)}
       </div>
   )
}