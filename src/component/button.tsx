import React from 'react';

interface IButtonProps {
    canClick: boolean;
    loading: boolean;
    actionText: string;
}

export const Button: React.FC<IButtonProps> = ({canClick, loading, actionText}) => {
    return(
        <button className={`button mt-2 py-2 text-lg ${canClick ? "bg-indigo-500 hover:bg-indigo-600" : "bg-gray-500 pointer-events-none"}`}>
            {loading ? "Loading" : actionText}
        </button>
    )
}