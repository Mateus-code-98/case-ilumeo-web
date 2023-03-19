import styled from "styled-components";
import { gray, secondary } from "../../theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 30px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
    justify-content: center;
    min-width: 500px;
    @media(max-width: 560px) {
        min-width: 100%;
    }
`

export const PreviousDaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 12px;
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