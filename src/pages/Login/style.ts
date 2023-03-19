import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    flex: 1;
    justify-content: center;
    min-width: 500px;
    @media(max-width: 560px) {
        min-width: calc(100% - 60px);
        margin: 30px;
    }
`

export const Title = styled.div`
    font-size: 18px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`