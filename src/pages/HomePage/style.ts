import styled, { css } from "styled-components";
import { background, gray, secondary } from "../../theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px;
    padding-top: 0px;
    padding-bottom: 70px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    min-width: 500px;
    @media(max-width: 600px) {
        min-width: 100%;
    }
`

export const PreviousDaysContainer = styled.div<{ marginTop: number }>`
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 12px;
    ${props => css`
        margin-top: ${props.marginTop ?? 0}px;
    `}
`

export const PreviousDayCard = styled.div<{ disabled: boolean }>`
    display: flex;
    padding: 16px;
    border-radius: 5px !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${secondary};
    cursor: pointer;
    ${props => props.disabled && css`
        opacity: 0.5;
        pointer-events: none;
    `}
`

export const PreviousDayDate = styled.div`
    color: ${gray};
`

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 12px;
`

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const TopContainer = styled.div<{ isMobile: boolean, scrollVisible: boolean }>`
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    z-index: 999;
    padding-top: 30px;
    padding-bottom: 10px;
    background: ${background};
    gap: 20px;
    min-width: 500px;
    ${props => (props.isMobile || (!props.isMobile && !props.scrollVisible)) && css`
        @media(max-width: 600px) {
            min-width: calc(100vw - 60px);
        }
    `}
    ${props => !props.isMobile && props.scrollVisible && css`
        @media(max-width: 600px) {
            min-width: calc(100vw - 72px);
        }
    `}
`

export const ButtonSignOut = styled.div<{ disabled: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${secondary};
    color: #FFF;
    font-size: 12px;
    padding: 10px;
    gap: 5px;
    cursor: pointer;
    ${props => props.disabled && css`
        opacity: 0.5;
        pointer-events: none;
    `}
`

export const ContainerToday = styled.div`
    display: flex;
    justify-content: space-between;
    gap:10px;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`

export const ContainerLastDays = styled.div`
     display: flex;
     align-items: center;
     gap: 5px;
`