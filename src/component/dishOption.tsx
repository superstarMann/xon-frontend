import React from 'react';

interface DishOptionProps{
    name: string;
    extra?: number | null;
    dishId: number;
    isSelected?: boolean;
    addOptionToItem: (dishId: number, optionName: string) => void
    removeOptionFormItem: (dishId: number, optionName: string) => void
}

export const DishOption:React.FC<DishOptionProps> = ({dishId, name, extra, addOptionToItem, isSelected, removeOptionFormItem}) => {
    const onClick = () => {
        if(isSelected){
            removeOptionFormItem(dishId, name)
        }else{
            addOptionToItem(dishId, name);
        }
    }

    return(
        <button 
        className={`flex border-2 px-2 py-1 mb-2 rounded-lg
        ${isSelected ? "border-lime-600": "hover:border-lime-800"}`}
        onClick={onClick}
        >
            <h6>{name}</h6>
            <h6>{extra}</h6>
        </button>
    )
}