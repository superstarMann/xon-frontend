import React, { useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { verifyEmailMutation, verifyEmailMutationVariables } from '../../api/verifyEmailMutation';
import { useMe } from '../../usehook/useMe';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet-async';

const VERIFYEMAIL_MUTATION = gql`
 mutation verifyEmailMutation($input:VerifyEmailInput!){
    verifyEmail(input: $input){
        ok
        error
    }
 }
`

export const ConfirmEmail = () => {
    const history = useHistory();
    const { data: userData } = useMe();
    const client = useApolloClient();
    const onCompleted = (data: verifyEmailMutation) => {
      const {
        verifyEmail: { ok },
      } = data;
      if (ok && userData?.me.id) {
        client.writeFragment({
          id: `User:${userData.me.id}`,
          fragment: gql`
            fragment VerifiedUser on User {
              verified
            }
          `,
          data: {
            verified: true,
          },
        });
        history.push('/');
      }
    };
    const [verifyEmail] = useMutation<verifyEmailMutation, verifyEmailMutationVariables>(
      VERIFYEMAIL_MUTATION,
      {
        onCompleted,
      }
    );
    useEffect(() => {
      const [_, code] = window.location.href.split("code=");
      verifyEmail({
        variables: {
          input: {
            code,
          },
        },
      });
    }, [verifyEmail]);

    return(
            <div className='lg:bg-gray-700 text-white h-screen flex flex-col justify-center items-center pb-28'>
              <Helmet><title>confirm email | XON</title></Helmet>
                <h2 className='text-lg mb-2 font-semibold'>Confirming email...</h2>
                <h4 className='text-base'>Please wait, don't close this page...</h4>
            </div>
    )
}