import React, { useState, useCallback, useEffect } from "react";
import { useApi } from "../../hooks/api";
import { useGlobal } from "../../hooks/global";
import { IWorkedDaysProps } from "../../interfaces";

export const HomePage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [workingDays, setWorkingDays] = useState<IWorkedDaysProps>({})

    const { notify } = useGlobal()

    const { api } = useApi()

    const searchWorkingDays = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await api.get("/users/working-time")
            setWorkingDays(data)
        } catch (err: any) {
            const error = err.response ? err.response.data : "SERVER ERROR"
            if (error !== "SERVER ERROR") notify("Não foi possível buscar suas horas trabalhadas!", "alert")
            else notify("ERRO INTERNO DO SISTEMA!", "error")
        }
        setLoading(false)
    }, [api])

    useEffect(() => { searchWorkingDays() }, [])

    return (
        <div>
            HomePage
        </div>
    )
}