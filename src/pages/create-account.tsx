import React from 'react'
import gql from 'graphql-tag'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../component/button'
import { CountrySelect, UserRole } from '../api/globalTypes'
import { FormError } from '../component/formerror'
import { useMutation } from '@apollo/client'
import { createAccountMutation, createAccountMutationVariables } from '../api/createAccountMutation'
import { Helmet } from 'react-helmet-async'
import { PATTERN } from '../constant'


const CREATE_ACCOUNT_MUTATION = gql`
 mutation createAccountMutation($createAccountInput: CreateAccountInput!){
    createAccount(input: $createAccountInput){
        ok
        error
    }
 }
`

interface IFormProps{
    email: string;
    password: string;
    role: UserRole;
    countrySelect: CountrySelect;
}

export const CreateAccount = () => {
    const history = useHistory();
    const {register, getValues, formState:{errors, isValid}, handleSubmit} = useForm<IFormProps>(
        {mode:'onChange', defaultValues:{role:UserRole.User, countrySelect:CountrySelect.United_Kingdom},
    });
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: {ok}
        } = data;
        if(ok){
            alert('Account Created! Log in Now!');
            history.push('/')
        }
        
    }
    const [createAccountMutation, {data:createAccountResult, loading}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION,{
        onCompleted        
    });
    const onSubmit = () => {
        if(!loading){
            const {email, password, role, countrySelect} = getValues()
            createAccountMutation({
                variables:{
                    createAccountInput:{
                        email,
                        password,
                        role,
                        countrySelect
                    }
                }
            })
        }
    }

    return(
        <div className='lg:bg-gray-700 lg:h-screen flex flex-col items-center justify-center'>
            <Helmet><title>create-account | XON</title></Helmet>
            <div className='w-full max-w-screen-sm flex flex-col items-center px-5 mt-10 lg:mb-10'>
                <h3 className='lg:text-white font-semibold text-3xl mb-5'>Create Account</h3>
                <h4 className='lg:text-white font-medium w-full text-left text-xl mb-3'>Let's get Start!</h4>
                <form className='w-full grid gap-3 py-3' onSubmit={handleSubmit(onSubmit)}>
                    <input
                     className='input' 
                     placeholder='example@example.com'
                     type='email'
                     {...register('email',{required: 'Email is required', pattern: PATTERN})}/>
                     {errors.email?.message && (
                         <FormError errorMessage={errors.email.message}/>
                     )}
                    <input
                     className='input'  
                     placeholder='password'
                     type='password'
                     {...register('password', {required: 'Password is required', minLength:3})}/>
                     {errors.password?.message && (
                         <FormError errorMessage={errors.password.message}/>
                     )}
                     {errors.email?.type === "minLength" && (
                         <FormError errorMessage={`Password must be more than 3 chars.`}/>
                     )}
                     <select {...register('role', {required: true})} className='input'>
                         {Object.keys(UserRole).map((role, index) => (
                             <option key={index}>{role}</option>
                         ))}
                     </select>
                     <select {...register('countrySelect', {required: true})} className='input'>
                         {Object.keys(CountrySelect).map((countrySelect, index) => (
                             <option key={index}>{countrySelect}</option>
                         ))}
                     </select>
                    <Button canClick={isValid} loading={loading} actionText={'Create an Account'}/>
                </form>
                {createAccountResult?.createAccount.error && (
                    <FormError errorMessage={createAccountResult.createAccount.error}/>
                )}
                <div className='w-full text-center lg:text-white'>
                    Already have an account?{" "}
                    <Link to='/' className='hover:underline lg:text-yellow-200 text-indigo-500'>Log In Now</Link>
                </div>
            </div>
        </div>
    )
}