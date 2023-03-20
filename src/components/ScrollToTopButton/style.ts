import styled, { css } from "styled-components";
import { shadowColor, tertiary } from "../../theme";

export const Container = styled.div<{ open: boolean }>`
    cursor: pointer;
    box-shadow:0.125rem 0.125rem 0.5rem ${shadowColor};
    background: ${tertiary};
    position: fixed;
    opacity: 0;
    display: none;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    bottom: 16px;
    border-radius: 50%;
    right: calc(50vw - 255px);
    ${props => props.open && css`
        opacity: 1;
        width: 40px;
        display: flex;
    `}
    @media (max-width: 600px) {
        right: 30px;
        bottom: 15px;
    }
`;