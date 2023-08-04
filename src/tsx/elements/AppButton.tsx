import React from 'react';

interface ButtonProps {
    children: React.ReactElement | string;
    type: "button" | "submit" | "reset" | undefined;
    isAccent?: boolean;
    onClick?: (e: any) => void
}

const AppButton:React.FC<ButtonProps> = ({children,type, isAccent, onClick}) => {
    return (
        <button
            type={type}
            className={`btn ${isAccent && '_accent'}`}
            onClick={onClick}
        >
            {children}
        </button>

    );
}

export default AppButton;
