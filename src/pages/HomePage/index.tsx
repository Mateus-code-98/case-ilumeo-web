import React, { useState, useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useApi } from "../../hooks/api";
import { useGlobal } from "../../hooks/global";
import { Button } from "../../components/Button";
import { REACT_APP_API } from "../../utils/envs";
import { IWorkedDaysProps } from "../../interfaces";
import { msToTimeService } from "../../services/msToTime.service";
import { getWorkingDaysService } from "../../services/getWorkingDays.service";
import { calcWorkingTimeService } from "../../services/calcWorkingTime.service";
import { Container, Content, Header, PreviousDayCard, PreviousDayDate, PreviousDaysContainer, UserContainer } from "./style";

export const HomePage: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState<Socket>()
    const [workingTimeToday, setWorkingTimeToday] = useState(0)
    const [checkInProgress, setCheckInProgress] = useState(false)
    const [workingDays, setWorkingDays] = useState<IWorkedDaysProps>({})

    const { notify } = useGlobal()

    const { api, user, signOut } = useApi()

    const searchWorkingDays = useCallback(async (socket?: Socket) => {
        setLoading(true)
        if (REACT_APP_API) {
            socket?.removeAllListeners()
            socket?.disconnect()

            const socketInstance = io(REACT_APP_API)
            setSocket(socketInstance)

            socketInstance.on(user.id, () => searchWorkingDays(socket))
        }
        try {
            const [result_working_time, result_check_in_progress] = await Promise.all([
                api.get("/users/working-time"),
                api.get("/users/check-in-progress")
            ])
            setWorkingDays(result_working_time?.data)
            setCheckInProgress(!!result_check_in_progress?.data?.id)
        } catch (err: any) {
            const error = err.response ? err.response.data : "SERVER ERROR"
            if (error !== "SERVER ERROR") notify("Não foi possível buscar suas horas trabalhadas!", "alert")
            else notify("ERRO INTERNO DO SISTEMA!", "error")
        }
        setLoading(false)
    }, [api])

    const checkInOut = useCallback(async () => {
        setLoading(true)
        try {
            const method = checkInProgress ? "put" : "post";
            await api[method]("/checks");
            searchWorkingDays(socket);
        }
        catch (err: any) {
            const error = err.response ? err.response.data : "SERVER ERROR"
            if (error !== "SERVER ERROR") notify("Não foi possível realizar seu ponto!", "alert")
            else notify("ERRO INTERNO DO SISTEMA!", "error")
        }
        setLoading(false)
    }, [checkInProgress, api, socket])

    useEffect(() => {
        let to_add = 0

        setWorkingTimeToday(calcWorkingTimeService(workingDays.today?.checks ?? [], to_add));

        const interval = setInterval(() => {
            to_add++;
            setWorkingTimeToday(calcWorkingTimeService(workingDays.today?.checks ?? [], to_add));
        }, 1000);

        return () => clearInterval(interval);

    }, [workingDays]);

    useEffect(() => { searchWorkingDays() }, [])

    return (
        <Container>
            <Content>

                <Header>
                    <div>Relógio de ponto</div>
                    <UserContainer onClick={signOut}>
                        <b>#{user.code}</b>
                        <div>Usuário</div>
                    </UserContainer>
                </Header>

                <div>
                    <b style={{ fontSize: 18 }}>{msToTimeService(workingTimeToday)}</b>
                    <div style={{ fontSize: 12 }}>Horas trabalhadas hoje</div>
                </div>

                <Button
                    text={checkInProgress ? "Hora de saída" : "Hora de entrada"}
                    onClick={checkInOut}
                    loading={loading}
                    disabled={loading}
                />

                <PreviousDaysContainer>
                    <div>Dias anteriores</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingRight: 10, marginRight: -10, overflow: "auto", maxHeight: "calc(calc(100 * var(--vh)) - 251px)" }}>
                        {getWorkingDaysService(workingDays).map((key: string) => (
                            <PreviousDayCard key={key}>
                                <PreviousDayDate>{key}</PreviousDayDate>
                                <b>{msToTimeService(workingDays[key].workingTime)}</b>
                            </PreviousDayCard>
                        ))}
                    </div>
                </PreviousDaysContainer>

            </Content>
        </Container>
    )
}