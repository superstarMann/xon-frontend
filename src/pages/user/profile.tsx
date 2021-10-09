import React from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { editProfile, editProfileVariables } from '../../api/editProfile';
import { UserRole } from '../../api/globalTypes';
import { isLoggedInVar } from '../../apollo';
import { Button } from '../../component/button';
import { FormError } from '../../component/formerror';
import { LOCALSTORAGE_TOKEN, PATTERN } from '../../constant';
import { useMe } from '../../usehook/useMe';
import { Helmet } from 'react-helmet';

const EDIT_PROFILE_MUTATION = gql`
 mutation editProfile($input: EditProfileInput!){
    editProfile(input: $input){
        ok
        error
    }
 }
`

interface IFormProps{
    email?: string;
    password?: string;
}

export const Profile = () => {
    const onClick = () => {
        isLoggedInVar(false);
        localStorage.removeItem(LOCALSTORAGE_TOKEN)
    }
    const client = useApolloClient();
    const {data: userData} = useMe();
    const onCompleted=(data:editProfile)=>{
        const {
            editProfile:{
                ok
            }
        } = data;
        if(ok && userData){
            const {me:{email: prevEmail}} = userData;
            const {email: newEmail} = getValues();
            if(prevEmail !== newEmail){
                client.writeFragment({
                    id:`User:${userData.me.id}`,
                    fragment:gql`
                    fragment EditedUser on User {
                        verified
                        email
                    }
                    `,
                    data:{
                        email: newEmail,
                        verified: false
                    }
                })
            }
        }
    }
    const [editProfileMutation, {data, loading}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE_MUTATION,{
        onCompleted
    });
    const {register, handleSubmit, formState:{errors, isValid}, getValues } = useForm<IFormProps>({
        mode:'onChange', 
        defaultValues:{
           email: userData?.me.email,
        }
    });
    const onSubmit = () => {
        const {email, password} = getValues();
        editProfileMutation({
            variables:{
                input:{
                    email,
                    ...(password !== "" && {password}),
                }
            }
        })
    }

    return(
        <div className='h-screen lg:bg-gray-700 flex flex-col lg:justify-center items-center'>
           <div className='w-full max-w-screen-sm flex flex-col items-center lg:mb-32'>
               <Helmet><title>edit-profile | xon</title></Helmet>
             <h2 className='lg:text-white text-3xl font-semibold mb-6'>Edit Your Profile</h2>
             <form className='w-full grid gap-3 px-5' onSubmit={handleSubmit(onSubmit)}>
              <input
              className='input'
              type='email' 
              placeholder='example@eample.com'
              {...register('email', {pattern: PATTERN})}/>
              {errors.email?.message && (
                  <FormError errorMessage={errors.email.message}/>
              )}
              <input
              className='input'
              type='password' 
              placeholder='password'
              {...register('password', {minLength:3})}/>
              {errors.password?.message && (
                  <FormError errorMessage={errors.password.message}/>
              )}
              {errors.password?.type === "minLength" && (
                  <FormError errorMessage={'Password must be more than 3 chars.'}/>
              )}
              <Button canClick={isValid} loading={loading} actionText={"Save Profile"}/>
              {data?.editProfile.error && (
                  <FormError errorMessage={data.editProfile.error}/>
              )}
              <button className='text-center py-2 font-medium tracking-wide bg-yellow-100 rounded-lg' onClick={onClick}>Log Out</button>
             </form>
           </div>
        </div>
    )
}