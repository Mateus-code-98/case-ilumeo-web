import React, { PropsWithChildren } from "react"
import { ApiProvider } from "./api";
import { GlobalProvider } from "./global";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <GlobalProvider>
            <ApiProvider>
                {children}
            </ApiProvider>
        </GlobalProvider>
    )
}

export default AppProvider;