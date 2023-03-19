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

export const PreviousDayCard = styled.div`
    display: flex;
    padding: 16px;
    border-radius: 5px !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: ${secondary};
    cursor: pointer;
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