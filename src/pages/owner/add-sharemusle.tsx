import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { createShareMusle, createShareMusleVariables } from "../../api/createShareMusle";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../component/button";
import { smallCategory } from "../../component/smallCategory";

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
    countryName: smallCategory;
    file: FileList;
}

export const AddShareMusle = () => {
    const history = useHistory();
    const onCompleted = (data: createShareMusle) => {
        const {createShareMusle:{ok}} = data;
        if(ok){
            setUploading(false);
            history.push('/')
            alert('Well done!')
        }
    }
    const [createShareMusleMutation, {data, loading}] = useMutation<createShareMusle, createShareMusleVariables>(CREATE_SHAREMUSLE,{
        onCompleted
    })
    const {register, handleSubmit, getValues, formState:{errors, isValid}} = useForm<IFormProps>({mode:'onChange'});
    const [uploading, setUploading] = useState(false)
    const onSubmit = async() => {
        try{
            setUploading(true);
            const {name, address, countryName, file} = getValues();
            const actualFile = file[0];
            const formBody = new FormData();
            formBody.append('file', actualFile);
            const {url: coverImg} = await (
                await fetch('http://localhost:5000/uploads/',{
                    method:'POST',
                    body: formBody
                })
            ).json();
            createShareMusleMutation({
                variables:{
                    input:{
                        name,
                        coverImg,
                        countryName,
                        address
                    }
                }
            })
        }catch(error){}
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
                        <select {...register('countryName', {required: true})} className='input'>
                         {Object.keys(smallCategory).map((smallCategory, index) => (
                             <option key={index}>{smallCategory}</option>
                         ))}
                     </select>
                        <input
                        className='input'
                        type='file'
                        {...register('file', {required: true})}
                        accept="image/*"
                        />
                        <Button canClick={isValid} loading={uploading} actionText='Create ShareMusle'/>
                    </form>
                </div>
            </div>
        </div>
    )
}