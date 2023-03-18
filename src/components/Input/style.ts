import styled, { css } from "styled-components";
import { secondary } from "../../theme";

export const Container = styled.div<{ disabled: boolean }>`
    cursor: text;
    display: flex;
    flex-direction: column;
    background: ${secondary};
    padding: 20px;
    border-radius: 5px;
    gap: 5px;
    color: #FFF;
    ${props => props.disabled && css`
        opacity: 0.5;
        cursor: not-allowed;
    `}
`

export const BaseInput = styled.input`
    all: unset;
    background: ${secondary};
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
`

export const Label = styled.label<{ disabled: boolean }>`
    font-weight: lighter;
    font-size: 12px;
    cursor: text;
    user-select: none;
    ${props => props.disabled && css`
        cursor: not-allowed;
    `}
`