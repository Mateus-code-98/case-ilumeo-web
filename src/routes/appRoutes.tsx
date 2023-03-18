import React from "react";
import { HomePage } from "../pages/HomePage";
import { Routes as Switch, Route, Navigate } from "react-router-dom";

export const AppRoutes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Switch>
    )
};