import React from 'react';

interface FieldProps {
    type?: string;
    name?: string;
    label?: string;
    value?: string;
    handleChange?: (e:any) => void;
}

const Field:React.FC<FieldProps> = ({type, name, label, value, handleChange}) => {
    return (
        <div className="field">
            <input
                className="field__input"
                type={type}
                name={name}
                id={name}
                placeholder=" "
                defaultValue={value || ''}
                onChange={handleChange}
                />

            <label className="field__label" htmlFor={name}>{label}</label>
        </div>
    );
}

export default Field;
