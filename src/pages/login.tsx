import React from 'react';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../apollo';

interface IForm {
    email: string;
    password: string;
    role: string;
}

export const Login = () => {
    const onClick = () => {
        isLoggedInVar(true);
    }

    const {watch, getValues, handleSubmit, register} = useForm<IForm>()

    const onSubmit = () => {
        console.log(getValues())
    }

    return(
        <div className='bg-gray-700 h-screen flex justify-center items-center'>
            <div className='w-full max-w-lg rounded-lg bg-white text-center py-10'>
                <h3 className='font-semibold text-2xl mb-5'>Log In</h3>
                <form className='flex flex-col px-5 py-3' onSubmit={handleSubmit(onSubmit)}>
                    <input
                     {...register("email", {required: true})}
                     placeholder="example@emaple.com"
                     className="px-5 py-3 mb-3 shadow-inner bg-gray-100 border-2 focus:border-indigo-700 focus:border-opacity-50 focus:outline-none rounded-lg "
                    />
                    <input
                     {...register("password", {required: true})}
                     placeholder="password"
                     className="px-5 py-3 mb-3 shadow-inner bg-gray-100 border-2 focus:border-indigo-700 focus:border-opacity-50 focus:outline-none rounded-lg "
                    />
                    <button onClick={onClick} className='bg-indigo-600 hover:bg-indigo-700 text-lg text-white font-normal mt-2 py-3 rounded-lg focus:outline-none'>Log In</button>
                </form>
            </div>
        </div>
    )
}