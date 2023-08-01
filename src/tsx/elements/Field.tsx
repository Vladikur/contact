import React from 'react';

interface FieldProps {
    type?: string;
    name?: string;
    label?: string;
    value?: string;
}

const Field:React.FC<FieldProps> = ({type, name, label, value}) => {
    return (
        <div className="field">
            <input
                className="field__input"
                type={type}
                name={name}
                id={name}
                placeholder=" "
                value={value}
                />

            <label className="field__label" htmlFor={name}>{label}</label>
        </div>
    );
}

export default Field;
