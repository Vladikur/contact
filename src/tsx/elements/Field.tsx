import React from 'react';

interface FieldProps {
    type?: string;
    name?: string;
    label?: string;
    value?: string;
    error?: string;
    handleChange?: (e:any) => void;
}

const Field:React.FC<FieldProps> = ({type, name, label, value, handleChange, error}) => {
    return (
        <div className="field-container">
            <div className={`field ${error && '_error'}`}>
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
            {
                error && <span className="field-error">{error}</span>
            }
        </div>
    );
}

export default Field;
