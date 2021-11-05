import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { shareMuslesPageQuery, shareMuslesPageQueryVariables } from '../../api/shareMuslesPageQuery';
import { ShareMusle } from '../../component/sharemusles';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { SHAREMUSLE_FRAGMENT } from '../../fragments';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


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
            ...ShareMusleParts
        }
    }
 }
 ${SHAREMUSLE_FRAGMENT}
`
export interface IProps{
    searchTerm: string;
}

export const ShareMusles = () => {
    const [page, setPage] = useState(1);
    const {data, loading} = useQuery<shareMuslesPageQuery, shareMuslesPageQueryVariables>(SHAREMUSLES_QUERY,{
        variables:{
            input:{
                page
            }
        }
    })
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1 );
    const history = useHistory();
    const {register, getValues, handleSubmit} = useForm<IProps>();
    const onSearch = () =>{
        const {searchTerm} = getValues();
        history.push({
            pathname:'/search',
            search: `?term=${searchTerm}`
        })
    }

    return(
        <div className='lg:bg-gray-600 h-screen'>
            <Helmet><title>Home | XON</title></Helmet>
                <form className='flex w-full justify-center items-center py-16 lg:py-28 bg-gray-100 lg:bg-gray-800'
                      onSubmit={handleSubmit(onSearch)}>
                    <input
                    {...register('searchTerm', {minLength:1})}
                    type="search" 
                    placeholder='Search ShareMusles...'
                    className='searchInput'
                    />
                </form>
                {!loading && (
                <div className='lg:bg-gray-700'>
                  <div className='max-w-screen-2xl mx-auto px-5 pt-5 lg:pt-10 lg:bg-gray-00 pb-20'>
                    <div className='overflow-x-auto'>
                    <div className='flex justify-evenly max-w-xs lg:max-w-screen-sm mx-auto '>
                        {data?.allCountries.countries?.map((country) => (
                          <Link key={country.id + ''} to={`/country/${country.slug}`}>
                            <div className='flex flex-col items-center cursor-pointer group' key={country.id}>
                                <div
                                style={{backgroundImage:`url(${country.coverImg})`}}
                                className='bg-cover w-16 h-16 rounded-full text-center group-hover:opacity-60 transition'
                                ></div>
                                <span className='mt-1 text-sm text-center font-medium lg:text-white'>
                                    {country.name}
                                </span>
                            </div>
                            </Link>
                        ))}
                    </div>
                    </div>
                    <div className='grid lg:grid-cols-4 gap-x-5 gap-y-10 mt-10 grid-cols-1 '>
                        {data?.allShareMusle.results?.map((shareMusle) => (
                        <ShareMusle 
                        address={shareMusle.address}
                        key={shareMusle.id}
                        id={shareMusle.id + ""}
                        countryName={shareMusle.country?.name + ""}
                        name={shareMusle.name}
                        coverImg={shareMusle.coverImg}
                        />
                        ))}
                    </div>
                        <div className='grid grid-cols-3 max-w-sm mx-auto text-center lg:text-white mt-10'>
                            {page > 1 ? (
                                <button onClick={onPrevPageClick}>&larr;</button>
                            ) : (<div></div>)}
                            <span className='text-sm'> The Page {page} of {data?.allShareMusle.totalPages}</span>
                            {page === data?.allShareMusle.totalPages ? (<div></div>):(
                                <button onClick={onNextPageClick}>&rarr;</button>
                            )}
                        </div>
                </div>
                </div>
                )}
        </div>
    )
    }