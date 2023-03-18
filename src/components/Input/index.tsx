import React, { useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import { BaseInput, Container, Label } from "./style";

interface IInputProps {
    label?: string;
    disabled: boolean;
    required: boolean;
}

export interface IInputRefProps {
    getValue: () => string
}

const InputComponent: React.ForwardRefRenderFunction<IInputRefProps, IInputProps> = (props, ref) => {
    const { label, disabled, required } = props

    const input_ref = useRef<HTMLInputElement>(null)

    const handleClickContainer = useCallback(() => {
        input_ref.current?.focus()
    }, [input_ref])

    const getValue = useCallback(() => {
        return input_ref.current?.value || ""
    }, [input_ref])

    useImperativeHandle(ref, () => ({ getValue }))

    return (
        <Container disabled={disabled} onClick={handleClickContainer}>
            {label && (
                <Label disabled={disabled}>
                    {label}
                </Label>
            )}
            <BaseInput required={required} disabled={disabled} ref={input_ref} />
        </Container>
    )
}

export const Input = forwardRef(InputComponent)