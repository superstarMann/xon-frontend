import React, { useState } from'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { createDish, createDishVariables } from '../../api/createDish';
import { Button } from '../../component/button';
import { MY_SHAREMUSLE_QUERY } from './my-shareMusle';
import { Helmet } from 'react-helmet-async';

const CREATE_DISH = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;
interface IParams{
    shareMusleId: string;
}

interface IForm{
    name: string;
    price: string;
    description: string;
    [key: string]: string;
}

export const AddService = () => {
    const {shareMusleId} = useParams<IParams>();
    const history = useHistory();
    const onCompleted = (data: createDish) => {
        const {createDish:{ok}} = data;
        if(ok){
            history.goBack();
        }
    }
    const [createDishMutation, {loading}] = useMutation<createDish, createDishVariables>(CREATE_DISH,{
         onCompleted,
         refetchQueries:[
            {
                query: MY_SHAREMUSLE_QUERY,
                variables:{
                    input:{
                        id: +shareMusleId
                    }
                }
            }
        ]
    });
    const {getValues, handleSubmit, register, formState:{isValid}, setValue} = useForm<IForm>({mode:'onChange'})
    const onSubmit = () =>{
        const {name, price, description, ...rest} =getValues()
        const optionObjcets = OptionsNumber.map((theId) => ({
            name: rest[`${theId} - OptionName`],
            extra: +rest[`${theId} - OptionExtra`]
        }))
        createDishMutation({
            variables:{
                input:{
                    name,
                    price: +price,
                    description,
                    shareMusleId: +shareMusleId,
                    options: optionObjcets
                }
            }
        });
        alert('Well done!')
    }
    const [OptionsNumber, setOptionsNumber] = useState<number[]>([]);
    const onAddOptionClick = () => {
        setOptionsNumber((current) => [Date.now(), ...current])
    }
    const onDeleteClick = (idToDelete: number) => {
        setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
        setValue(`${idToDelete} - OptionName`,"")
        setValue(`${idToDelete} - OptionExtra`, "")
    }

    return(
        <div className='h-screen lg:bg-gray-700 flex flex-col lg:justify-center items-center'>
            <Helmet><title>Create Service | XON</title></Helmet>
           <div className='w-full max-w-screen-sm flex flex-col items-center lg:mb-32'>
             <h2 className='lg:text-white text-3xl font-semibold mb-6'>Create Service</h2>
             <form className='w-full grid gap-3 px-5' onSubmit={handleSubmit(onSubmit)}>
              <input
              className='input'
              type='text' 
              placeholder='집까지 보조'
              {...register('name',{required: "Name is required"})}/>
              <input
              className='input'
              type='text'
              placeholder='Description'
              {...register('description', {required: "Description is required."})}/>
              <input
              className='input'
              type='number'
              placeholder="Price"
              min={0}
              {...register('price', {required: `Price is required`})}
              />
              <div className='my-2 lg:text-white'>
                  <h4 className='font-medium mb-2 text-lg'>Service Options</h4>
                  <span 
                  onClick={onAddOptionClick}
                  className='text-sm cursor-pointer bg-white text-gray-700 font-semibold py-1 px-2 rounded-lg'>
                    Add Service Options
                    </span>
                {OptionsNumber.length !== 0 && OptionsNumber.map((id) => (
                    <div key={id} className='mt-2'>
                        <input
                        //@ts-ignore
                        {...register(`${id} - OptionName`)} 
                        type='text' 
                        placeholder={'Bus Ride'} 
                        className='text-black focus:outline-none shadow-inner my-2 lg:-mb-2 bg-gray-100 px-4 py-2 mr-4 border-1 rounded-lg'/>
                        <input
                        //@ts-ignore
                        {...register(`${id} - OptionExtra`)} 
                        type='number' 
                        placeholder={`0$`} 
                        className='text-black focus:outline-none shadow-inner bg-gray-100 px-4 py-2 border-1 rounded-lg'/>
                        <span 
                        onClick={() => onDeleteClick(id)}
                        className='focus:outline-none px-4 py-2 border-1 rounded-lg bg-red-500 ml-4 cursor-pointer'>
                            Delete
                        </span>
                    </div>
                ))} 
              </div>
              <Button canClick={isValid} loading={loading} actionText={`Create Service`}/>
             </form>
           </div>
        </div>
    )
}