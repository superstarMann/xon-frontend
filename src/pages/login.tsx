import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { FormError } from '../component/formerror';
import { loginMutation, loginMutationVariables } from '../api/loginMutation';
import { Button } from '../component/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faGg } from '@fortawesome/free-brands-svg-icons';

const LOGIN_MUTATION = gql`
 mutation loginMutation($loginInput: LoginInput!){
    login(input: $loginInput){
        ok
        error
        token
    }
 }
`

interface IForm {
    email: string;
    password: string;
    resultError?: string;
}

export const Login = () => {
    const { getValues, handleSubmit, register, formState:{errors, isValid}} = useForm<IForm>({mode: 'onChange'})
    const onCompleted = (data:loginMutation) => {
        const {login: {ok, token}} = data;
        if(ok && token){
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authTokenVar(token);
            isLoggedInVar(true)
        }
    }
    const [loginMutation, {data: loginMutationResult, loading}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
        onCompleted
    })
    const onSubmit = () => {
        if(!loading){
            const {email, password} = getValues()
            loginMutation({
                variables:{
                    loginInput:{
                        email,
                        password
                    }
                }
            });
        }
    };
    
    return(
        <div className='lg:bg-gray-700 lg:h-screen flex flex-col items-center lg:justify-center'>
            <Helmet>
                <title>Login | xon</title>
            </Helmet>
            <div className='w-full max-w-screen-sm flex flex-col items-center px-5 mt-10 lg:mb-10'>
                <FontAwesomeIcon icon={faGg} className='mb-5 text-5xl lg:text-white'/>
                <h4 className='w-full font-medium text-left mb-3 text-xl lg:text-white'>Welcome!</h4>
                <form className='grid gap-3 py-3 w-full' onSubmit={handleSubmit(onSubmit)}> 
                    <input
                     {...register("email", {required: `Email is required`})}
                     placeholder="example@emaple.com"
                     type="email"
                     className="input" 
                    />
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email.message}/>
                    )}
                    <input
                     {...register("password", {required: `Password is required`, minLength:3})}
                     placeholder="password"
                     type="password"
                     className="input" 
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password.message}/>
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more than 3 chars."/>
                    )}
                    <Button canClick={isValid} loading={loading} actionText={'Log In'}/>
                    {loginMutationResult?.login.error && (
                        <FormError errorMessage={loginMutationResult.login.error}/>
                    )}
                </form>
                <div className='w-full text-center lg:text-white'>
                    New to User?{" "}
                    <Link to='/create-account' className='lg:text-yellow-200 text-indigo-500 hover:underline'>create an Account!</Link>
                </div>
            </div>
        </div>
    )
}