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

    const {watch, getValues, handleSubmit, register, formState:{errors}} = useForm<IForm>()

    const onSubmit = () => {
        console.log(getValues())
    }

    return(
        <div className='bg-gray-700 h-screen flex justify-center items-center'>
            <div className='w-full max-w-lg rounded-lg bg-white text-center pt-8 pb-3'>
                <h3 className='font-semibold text-2xl mb-5'>Log In</h3>
                <form className='grid gap-3 px-5 py-3' onSubmit={handleSubmit(onSubmit)}>
                    <input
                     {...register("email", {required: `Email is required`})}
                     placeholder="example@emaple.com"
                     type="email"
                     className="input" 
                    />
                    {errors.email?.message && (
                        <span className='error'>
                            {errors.email.message}
                        </span>
                    )}
                    <input
                     {...register("password", {required: `Password is required`, minLength:3})}
                     placeholder="password"
                     type="password"
                     className="input" 
                    />
                    {errors.password?.message && (
                        <span className='error'>
                            {errors.password.message}
                        </span>
                    )}
                    {errors.password?.type === "minLength" && (
                        <span className='error'>
                            Password must be more than 3 chars.
                        </span>
                    )}
                    <button  className='bg-indigo-600 hover:bg-indigo-700 text-lg text-white font-normal mt-2 py-3 rounded-lg focus:outline-none'>Log In</button>
                </form>
            </div>
        </div>
    )
}