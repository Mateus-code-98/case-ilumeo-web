import styled, { css } from "styled-components";
import { shadowColor, tertiary } from "../../theme";

export const Container = styled.div<{ open: boolean }>`
    position: fixed;
    opacity: 0;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    bottom: 16px;
    display: flex;
    background: ${tertiary};
    right: calc(50vw - 255px);
    box-shadow:0.125rem 0.125rem 0.5rem ${shadowColor};
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    -ms-transition: opacity 0.3s ease;
    -o-transition: opacity 0.3s ease;
    transition: opacity 0.3s ease;
    cursor: pointer;
    ${props => props.open && css`
        opacity: 1;
    `}
    @media (max-width: 600px) {
        right: 30px;
        bottom: 15px;
    }
`;