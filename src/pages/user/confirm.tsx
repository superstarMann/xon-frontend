import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { verifyEmailMutation, verifyEmailMutationVariables } from '../../api/verifyEmailMutation';

const VERIFYEMAIL_MUTATION = gql`
 mutation verifyEmailMutation($input:VerifyEmailInput!){
    verifyEmail(input: $input){
        ok
        error
    }
 }
`

export const ConfirmEmail = () => {
    const [verifyEmail, {loading}] = useMutation<
    verifyEmailMutation, verifyEmailMutationVariables
    >(VERIFYEMAIL_MUTATION);
    useEffect(()=>{
        const [_, code] = window.location.href.split('code=')
        /*verifyEmail({
            variables:{
                input:{
                   code
                }
            }
        })*/
    }, []);

    return(
            <div className='lg:bg-gray-700 text-white h-screen flex flex-col justify-center items-center pb-28'>
                <h2 className='text-lg mb-2 font-semibold'>Confirming email...</h2>
                <h4 className='text-base'>Please wait, don't close this page...</h4>
            </div>
    )
}