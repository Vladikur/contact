import React from 'react';

interface CheckboxProps {
    code: string;
    name: string;
    checked?: boolean;
    handleChangeTag: (e: any) => void
}

const AppCheckbox:React.FC<CheckboxProps> = ({code, name, handleChangeTag, checked}) => {
    return (
        <label className="checkbox">
            <input checked={checked} type="checkbox" name={code} hidden onChange={handleChangeTag} />
            <span>{name}</span>
        </label>
    );
}

export default AppCheckbox;
