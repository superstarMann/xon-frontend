import React from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

interface IForm{
    email: string
    password: string
}

export const Login = () => {
    const onClick = () => {
        isLoggedInVar(true)
    }

    const {watch, formState:{errors}, handleSubmit, register} = useForm<IForm>()
    const onSubmit = () => {
        console.log(watch())
    }

    return(
        <div className='h-screen flex items-center justify-center bg-gray-800'>
          <div className='w-full max-w-lg bg-white py-10 rounded-lg'>
              <h3 className='font-bold text-center text-2xl text-gray-800'>Log In</h3>
           <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col mt-5 px-5'>
                   <input {...register("email", {required: true, pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/})}
                          type="email"
                          placeholder="example@email.com"
                          className='bg-gray-100 py-2 focus:outline-none rounded-lg shadow-inner px-3 mb-3 border-2 focus:border-indigo-500 border-opacity-60'
                   />
                   <input {...register("password", {required: true})}
                          type="password"
                          placeholder="password"
                          className='bg-gray-100 py-2 focus:outline-none rounded-lg shadow-inner px-3 mb-3 border-2 focus:border-indigo-500 border-opacity-60'
                   />
               <button onClick={onClick} className='bg-purple-500 text-white hover:bg-purple-700 rounded-lg py-3 text-lg focus:outline-none'>Submit</button>
           </form>
          </div>
        </div>
    )
}