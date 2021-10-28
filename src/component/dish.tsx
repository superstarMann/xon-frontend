import React from 'react';
import { shareMusle_shareMusle_shareMusle_menu_options } from '../api/shareMusle';

interface IProps{
  name: string;
  price: string;
  description: string;
  options?: shareMusle_shareMusle_shareMusle_menu_options[] | null; 
  orderStarted?: boolean;
  id?:number
  isSelected?: boolean
  addItemsToOrder?: (dishId: number) => void;
  removeOrder?: (dishId: number) => void
}

export const Dish: React.FC<IProps> = ({ 
  id =1,
  description, 
  name, 
  price, 
  options, 
  orderStarted = false,
  isSelected,
  addItemsToOrder,
  removeOrder
  }) => {
    const onClick = () => {
      if(orderStarted){
        if(!isSelected && addItemsToOrder){
          return addItemsToOrder(id)
        }
        if(isSelected && removeOrder){
          return removeOrder(id)
        }
      }
    }

    return (
      <div 
      onClick={onClick}
      className="px-4 py-4 border cursor-pointer hover:border-gray-800 transition-all ">
        <div className="mb-2">
          <h3 className="text-lg font-semibold pb-2">
            {name} 
            <span className='ml-2 font-medium'>${price}</span>
          </h3>
          <h4 className="font-medium opacity-80">{description}</h4>
        </div>
        {options && options.length !== 0 && (
          <div>
            <h5 className='py-2 font-semibold'>Service Options:</h5>
            {options.map((option) => (
              <div className='flex items-center'>
                <h5 className='mr-2'>{option.name}</h5>
                <h6 className='text-sm opacity-75'>(${option.extra})</h6>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };