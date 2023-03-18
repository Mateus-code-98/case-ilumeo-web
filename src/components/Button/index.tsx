import React from "react";
import { GenericButton } from "./style";
import { CircularProgress } from "@material-ui/core";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean;
    text: string;
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { loading, text, ...rest } = props
    return (
        <GenericButton {...rest}>
            {!loading && text}
            {loading && (
                <CircularProgress
                    variant="indeterminate"
                    size={16}
                />
            )}
        </GenericButton>
    )
};