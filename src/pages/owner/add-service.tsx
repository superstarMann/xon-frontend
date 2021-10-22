import React from'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { createDish, createDishVariables } from '../../api/createDish';
import { Button } from '../../component/button';
import { MY_SHAREMUSLE_QUERY } from './my-shareMusle';

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
}

export const AddService = () => {
    const {shareMusleId} = useParams<IParams>();
    const history = useHistory();
    const onCompleted = (data: createDish) => {
        const {createDish:{ok}} = data;
        if(ok){
            history.goBack()
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
    const {getValues, handleSubmit, register, formState:{isValid}} = useForm<IForm>({mode:'onChange'})
    const onSubmit = () =>{
        const {name, price, description} =getValues()
        createDishMutation({
            variables:{
                input:{
                    name,
                    price: +price,
                    description,
                    shareMusleId: +shareMusleId
                }
            }
        });
        history.goBack()
    }

    return(
        <div className='h-screen lg:bg-gray-700 flex flex-col lg:justify-center items-center'>
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
              <Button canClick={isValid} loading={loading} actionText={`Create Service`} />
             </form>
           </div>
        </div>
    )
}