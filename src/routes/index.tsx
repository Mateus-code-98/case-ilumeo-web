import React from "react";
import styled from "styled-components";
import { useApi } from "../hooks/api";
import { background } from "../theme";
import { AppRoutes } from "./appRoutes";
import { AuthRoutes } from "./authRoutes";

const Container = styled.div`
    display: flex;
    flex: 1;
    background-color: ${background};
    height: 100vh;
`;

export const Routes: React.FC = () => {
    const { user } = useApi();

    return (
        <Container>
            {user ? <AppRoutes /> : <AuthRoutes />}
        </Container>
    )
};