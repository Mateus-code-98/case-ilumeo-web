import React from "react";
import { GenericButton } from "./style";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, ...rest } = props
    return (
        <GenericButton {...rest}>
            {children}
        </GenericButton>
    )
};