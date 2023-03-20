import styled, { css } from "styled-components";
import { primary, secondary } from "../../theme";

export const GenericButton = styled.button`
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 100%;
    font-size:13px;
    transition: all 0s;
    font-weight: bold;
    color:${secondary};
    background: ${primary}; 
    outline: none;
    border-radius: 5px;
    box-shadow:none;
    border: none;
    cursor: pointer;
    ${props => props.disabled && css`
        cursor: not-allowed;
        opacity: 0.5;
    `}
`