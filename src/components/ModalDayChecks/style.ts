import styled from "styled-components";
import { background, gray, secondary } from "../../theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: ${background};
    position: relative;
    border-radius: 5px;
    outline: 0;
    min-width:100vw;
    max-width:100vw;
    min-height: calc(100 * var(--vh));
    max-height: calc(100 * var(--vh));
    @media (min-width: 550px) {
        min-width:400px;
        max-width:400px;
        min-height: calc(80 * var(--vh));
        max-height: calc(80 * var(--vh));
    }
`

export const Column = styled.div`
    display:flex ;
    flex-direction:column;
`

export const Line = styled.div`
    display:flex ;
    flex-direction:row;
`

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 16px;
    box-shadow: 0.125rem 0.125rem 0.5rem rgba(0,0,0,0.1);
    padding: 20px;
    position: relative;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: ${secondary};
`

export const Title = styled.div`
    color: #FFF;
    font-weight: 600;
    font-size: 14px;
`

export const Description = styled.div`
    font-size: 12px;
    color: ${gray};
`

export const ContainerClose = styled.div`
    cursor: pointer;
`

export const Table = styled.table`
    border-spacing: 0 0.6rem;
    border-collapse: initial;
    font-size: 13.6px;
    padding-bottom:10px;
    width: 100%;
    color: #FFF;
    background: ${secondary};
    border-radius: 5px;
`

export const ContainerTable = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

export const TH = styled.th`
    text-align: center;
    color: ${gray};
`

export const TD = styled.td`
    text-align: center;
`