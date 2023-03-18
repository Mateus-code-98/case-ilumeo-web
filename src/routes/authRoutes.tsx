import React from "react";
import { Login } from "../pages/Login";
import { Routes as Switch, Route, Navigate } from "react-router-dom";

export const AuthRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Switch>
    )
};