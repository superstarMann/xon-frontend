import React from 'react';

interface IError{
    errorMessage: string

}

export const FormError: React.FC<IError> = ({errorMessage}) => (
    <span className="error">
        {errorMessage}
    </span>
)