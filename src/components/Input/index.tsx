import React, { useRef, useCallback } from "react";
import { BaseInput, Container, Label } from "./style";

interface IInputProps {
    label?: string;
    [key: string]: any;
}

export const Input: React.FC<IInputProps> = (props) => {
    const { label, ...rest } = props
    const input_ref = useRef<HTMLInputElement>(null)

    const handleClickContainer = useCallback(() => {
        input_ref.current?.focus()
    }, [input_ref])

    return (
        <Container onClick={handleClickContainer}>
            {label && (
                <Label>
                    {label}
                </Label>
            )}
            <BaseInput ref={input_ref} {...rest} />
        </Container>
    )
}