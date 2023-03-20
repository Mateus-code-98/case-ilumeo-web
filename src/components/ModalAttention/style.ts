import styled from "styled-components";
import { background, secondary } from "../../theme";

export const Content = styled.div`
    gap: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    background: ${background};
    min-width: 250px;
    @media (min-width: 430px) {
        min-width: 300px;
    }
`

export const ContainerIcon = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: ${secondary};
`

export const AttentionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #FFF;
    font-size: 14px;
`

export const ContentContainer = styled.p`
    text-align: center;
    max-width: 310px;
    text-overflow: ellipsis;
    overflow: hidden;
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex: 1;
`