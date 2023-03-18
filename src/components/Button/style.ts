import Button from "react-bootstrap/Button";
import styled, { css } from "styled-components";
import { primary, secondary } from "../../theme";

export const GenericButton = styled(Button)`
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 100%;
    font-size:13px;
    transition: all 0s;
    font-weight: bold;
    color:${secondary} !important;
    background: ${primary} !important; 
    outline: none !important;
    border-radius: 5px !important;
    box-shadow:none !important;
    border: 1px solid ${primary} !important;
    cursor: pointer;
    :hover{
        box-shadow:0 8px 25px -8px rgba(237,113,23,0.7);
        border: 2px solid ${primary};
    }
    :focus{
        box-shadow:none !important;
    }
    ${props => props.disabled && css`
        cursor: not-allowed;
        opacity: 0.5;
    `}
`