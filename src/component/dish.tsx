import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { shareMusle_shareMusle_shareMusle_menu_options } from '../api/shareMusle';

interface IProps{
  id?: number;
  name: string;
  price: string;
  description: string;
  isSelected?: boolean;
  addItemToOrder?: (dishId: number) => void
  removeOrder?: (dishId: number) => void
  options?: shareMusle_shareMusle_shareMusle_menu_options[] | null; 
}

export const Dish: React.FC<IProps> = ({ 
  id = 1,
  description, 
  name, 
  price, 
  options, 
  isSelected = false,
  addItemToOrder,
  removeOrder,
  children: dishOption,
  }) => {

    const onClick = () => {
      if(!isSelected && addItemToOrder){
        addItemToOrder(id)
      }
      if(isSelected && removeOrder){
        removeOrder(id)
      }
    }

    return (
      <div 
      className="px-4 py-4 border bg-gray-700">
        <div className="mb-2">
          <div className="text-lg font-semibold pb-2 flex justify-between">
            <div>
            {name} 
            <span className='ml-2 font-medium'>${price}</span>
            </div>
            <span className='pr-2 text-2xl'>
              <button onClick={onClick}>
                {isSelected ? <FontAwesomeIcon className='text-lime-500' icon={faCheckCircle}/> : <FontAwesomeIcon  icon={faCircle}/>}
              </button>
            </span>
          </div>
          <h4 className="font-medium opacity-80">{description}</h4>
        </div>
        {options && options.length !== 0 && (
          <div>
            <h5 className='py-2 font-semibold'>Service Options:</h5>
            {dishOption}
          </div>
        )}
      </div>
    );
  };