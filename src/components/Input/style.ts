import styled from "styled-components";
import { secondary } from "../../theme";

export const Container = styled.div`
    cursor: text;
    display: flex;
    flex-direction: column;
    background: ${secondary};
    padding: 20px;
    border-radius: 5px;
    gap: 5px;
    color: #FFF;
`

export const BaseInput = styled.input`
    all: unset;
    background: ${secondary};
    font-weight: bold;
    font-size: 18px;
    text-transform: uppercase;
`

export const Label = styled.label`
    font-weight: lighter;
    font-size: 14px;
    cursor: text;
    user-select: none;
`