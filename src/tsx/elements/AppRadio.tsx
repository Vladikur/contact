import React from 'react';

interface RadioProps {
    name: string;
    label: string;
    value: string;
    checked: boolean;
    onOptionChange: (e: any) => void;

}

const AppRadio:React.FC<RadioProps> = ({onOptionChange, checked, label, name, value}) => {
    return (
        <div className="radio">
            <input type="radio" id={value} name={name}
                   value={value} checked={checked} onChange={onOptionChange}/>
            <label htmlFor={value}>{label}</label>
        </div>
    );
}

export default AppRadio;
