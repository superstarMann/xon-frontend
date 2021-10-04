import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { meQuery } from '../api/meQuery';

const ME_QUERY = gql`
 query meQuery{
     me{
         id
         email
         role
         verified
         countrySelect
     }
 }
`;

export const useMe = () =>{
    return useQuery<meQuery>(ME_QUERY)
}