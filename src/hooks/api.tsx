import axios, { AxiosInstance } from "axios";
import React, { createContext, useCallback, useContext, useState, PropsWithChildren } from "react";
import { useGlobal } from "./global";
import { IUserProps } from "../interfaces";
import { REACT_APP_API } from "../utils/envs";
import { STATUS_FORBIDDEN, STATUS_UNAUTHORIZED } from "../utils/status_codes";

interface IDataProps {
    token: string;
    user: IUserProps;
};

interface ICredentialsProps {
    code: string;
};

interface ApiContextData {
    api: AxiosInstance;
    user: IUserProps;
    token?: string;
    signIn(credentials: ICredentialsProps): Promise<void>;
    signOut(): void;
};

const ApiContext = createContext<ApiContextData>({} as ApiContextData)

export const ApiProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { notifyOnly } = useGlobal()

    const [data, setData] = useState<IDataProps>(() => {
        const token = localStorage.getItem("@PontoIlumeo:token")
        const user = localStorage.getItem("@PontoIlumeo:user")
        if (token && user) return { token, user: JSON.parse(user) }
        return {} as IDataProps
    })

    const api = axios.create({ baseURL: REACT_APP_API })

    api.interceptors.request.use(async (config: any) => {
        const token = localStorage.getItem("@PontoIlumeo:token")

        config.headers.authorization = `Bearer ${token}`;

        return config
    });

    api.interceptors.response.use((response) => response, (error) => {
        const response_status = error.response.status

        const SIGN_OUT_STATUS = [STATUS_UNAUTHORIZED, STATUS_FORBIDDEN]

        if (SIGN_OUT_STATUS.includes(response_status)) {
            notifyOnly("Faça login novamente", "alert")
            signOut()
        }

        return Promise.reject(error);
    })

    const signIn = useCallback(async (props: ICredentialsProps) => {
        const res = await api.post("/login", props)
        const { token, user } = res.data

        localStorage.setItem("@PontoIlumeo:token", token)
        localStorage.setItem("@PontoIlumeo:user", JSON.stringify(user))

        setData({ token, user })
    }, [])

    const signOut = useCallback(() => {
        localStorage.removeItem("@PontoIlumeo:token")
        localStorage.removeItem("@PontoIlumeo:user")

        setData({} as IDataProps)
    }, [])

    return (
        <ApiContext.Provider value={{ signIn, signOut, user: data.user, token: data.token, api }}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApi(): ApiContextData {
    const context = useContext(ApiContext)
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider")
    }
    return context;
}