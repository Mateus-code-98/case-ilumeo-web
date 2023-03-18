import { CircularProgress } from "@material-ui/core";
import React from "react";
import { secondary } from "../../theme";
import { GenericButton } from "./style";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading?: boolean;
};

export const Button: React.FC<ButtonProps> = (props) => {
    const { children, loading, ...rest } = props
    return (
        <GenericButton {...rest}>
            {!loading && children}
            {loading && (
                <CircularProgress
                    variant="indeterminate"
                    size={16}
                />
            )}
        </GenericButton>
    )
};