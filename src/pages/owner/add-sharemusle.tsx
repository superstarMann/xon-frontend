import React from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { createShareMusle, createShareMusleVariables } from "../../api/createShareMusle";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../component/button";

const CREATE_SHAREMUSLE = gql`
 mutation createShareMusle($input: CreateShareMusleInput!){
    createShareMusle(input: $input){
        ok
        error
    }
 }
`

interface IFormProps {
    name: string;
    address: string;
    countryName: string;
}

export const AddShareMusle = () => {
    const [createShareMusleMutation, {data, loading}] = useMutation<createShareMusle, createShareMusleVariables>(CREATE_SHAREMUSLE)
    const {register, handleSubmit, getValues, formState:{errors, isValid}} = useForm<IFormProps>({mode:'onChange'});
    const onSubmit = () => {
        console.log(getValues());
    }
    
    return(
        <div>
            <Helmet><title>CreateShareMusle | XON</title></Helmet>
            <div className='h-screen lg:bg-gray-600 flex flex-col lg:justify-center items-center'>
                <div className='w-full max-w-screen-sm  flex flex-col items-center lg:mb-32'>
                    <h2 className='text-3xl lg:text-white mb-6 font-semibold'>Create ShareMusle!</h2>
                    <form className='w-full grid px-5 gap-3' onSubmit={handleSubmit(onSubmit)}>
                        <input
                         className='input'
                         type='text'
                         placeholder='Name'
                         {...register('name',{required:'Name is required'})}
                        />
                        <input
                        className='input'
                        type='text'
                        placeholder='Address'
                        {...register('address', {required:`Address is required`})}
                        />
                        <input
                        className='input'
                        type='text'
                        placeholder='Korea'
                        {...register('countryName', {required:'CountryName is required'})}
                        />
                        <Button canClick={isValid} loading={loading} actionText={`Create ShareMusle`}/>
                    </form>
                </div>
            </div>
        </div>
    )
}