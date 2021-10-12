import React, { useState } from'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useParams } from 'react-router';
import { countryQuery, countryQueryVariables } from '../../api/countryQuery';
import { COUNTRY_FRAGMENT, SHAREMUSLE_FRAGMENT } from '../../fragments';
import { Helmet } from 'react-helmet';
import { ShareMusle } from '../../component/sharemusles';

const COUNTRY_QUERY = gql`
 query countryQuery($input: CountryInput!){
     country(input: $input){
        ok
        error
        totalPages
        totalResults
        shareMusles{
            ...ShareMusleParts
        }
        country{
            ...CountryParts
        }
     }
 }
 ${SHAREMUSLE_FRAGMENT}
 ${COUNTRY_FRAGMENT}
`

interface IPromsProps{
    slug: string;
}

export const Country = () => {
    const [page, setPage] = useState(1);
    const params = useParams<IPromsProps>();
    const {data} = useQuery<countryQuery, countryQueryVariables>(COUNTRY_QUERY,{
        variables:{
            input:{
                page,
                slug: params.slug
            }
        }
    });
    const onNextPageClick = () => setPage((current) => current + 1);
    const onPrevPageClick = () => setPage((current) => current - 1 );
    
    return(
        <div>
            <Helmet><title>{`${data?.country.country?.name} | XON`}</title></Helmet>
            <div className='h-screen lg:bg-gray-600'>
              <div className='flex justify-center text-center border-b-2 shadow-md lg:border-gray-600 items-center py-20 lg:py-28'>
                <span className='lg:text-5xl text-3xl font-semibold lg:text-white'>{data?.country.country?.name}</span>
              </div>
              <div className='lg:bg-gray-600'>
                  <div className='max-w-screen-2xl mx-auto mt-10 px-5'>
                      <div className='grid lg:grid-cols-4 grid-cols-1 gap-x-5 gap-y-10'>
                      {data?.country.shareMusles?.map((shareMusle) => (
                      <div>
                          <ShareMusle
                          address={shareMusle.address}
                          key={shareMusle.id + ''}
                          id={shareMusle.id + ''}
                          name={shareMusle.name}
                          countryName={shareMusle.country?.name + ''}
                          coverImg={shareMusle.coverImg}
                          />
                      </div>
                  ))}
                      </div>
                      <div className='grid grid-cols-3 max-w-sm mx-auto text-center lg:text-white py-10'>
                          {page > 1 ? (
                              <button onClick={onPrevPageClick}>&larr;</button>
                          ) : (<div></div>)}
                          <span>The Page {page}</span>
                          {page !== data?.country.totalPages ? (
                          <button onClick={onNextPageClick}>&rarr;</button>
                          ) : (
                               <div></div>
                          )}
                      </div>
                  </div>
              </div>
            </div>            
        </div>
    )
}