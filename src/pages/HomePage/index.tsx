import React, { useState, useCallback, useEffect } from "react";
import { useApi } from "../../hooks/api";
import { BiHistory } from "react-icons/bi";
import { io, Socket } from "socket.io-client";
import { useGlobal } from "../../hooks/global";
import { RiLoginBoxLine } from "react-icons/ri";
import { Button } from "../../components/Button";
import { REACT_APP_API } from "../../utils/envs";
import { IWorkedDaysProps } from "../../interfaces";
import { ModalConfirm } from "../../components/ModalAttention";
import { ModalDayChecks } from "../../components/ModalDayChecks";
import { msToTimeService } from "../../services/msToTime.service";
import { generateDateService } from "../../services/generateDate.service";
import { getWorkingDaysService } from "../../services/getWorkingDays.service";
import { calcWorkingTimeService } from "../../services/calcWorkingTime.service";
import { ButtonSignOut, Column, Container, ContainerLastDays, ContainerToday, Content, Header, PreviousDayCard, PreviousDayDate, PreviousDaysContainer, TopContainer, UserContainer } from "./style";

export const HomePage: React.FC = () => {
    const { api, user, signOut } = useApi()
    const { notify, isMobile, scrollBarVisible } = useGlobal()

    const [loading, setLoading] = useState(false)
    const [workingTimeToday, setWorkingTimeToday] = useState(0)
    const [confirmSignOut, setConfirmSignOut] = useState(false)
    const [checkInProgress, setCheckInProgress] = useState(false)
    const [workingDays, setWorkingDays] = useState<IWorkedDaysProps>({})
    const [daySelected, setDaySelected] = useState<string | null>(null)

    const top_container_ref = React.useRef<HTMLDivElement>(null)

    const searchWorkingDays = useCallback(async (socket?: Socket) => {
        setLoading(true)
        if (REACT_APP_API) {
            socket?.removeAllListeners()
            socket?.disconnect()

            const socketInstance = io(REACT_APP_API)
            socketInstance.on(user.id, () => searchWorkingDays(socketInstance))
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
        }
        catch (err: any) {
            const error = err.response ? err.response.data : "SERVER ERROR"
            if (error !== "SERVER ERROR") notify("Não foi possível realizar seu ponto!", "alert")
            else notify("ERRO INTERNO DO SISTEMA!", "error")
        }
    }, [checkInProgress, api])

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

                <TopContainer ref={top_container_ref} scrollVisible={scrollBarVisible} isMobile={isMobile}>
                    <Header>
                        <div>Relógio de ponto</div>
                        <UserContainer>
                            <b>#{user.code}</b>
                            <div>Usuário</div>
                        </UserContainer>
                    </Header>

                    <ContainerToday>
                        <Column>
                            <b style={{ fontSize: 18 }}>
                                {msToTimeService(workingTimeToday, true)}
                            </b>
                            <div style={{ fontSize: 12 }}>
                                Horas trabalhadas hoje
                            </div>
                        </Column>
                        <ButtonSignOut disabled={loading} onClick={() => setConfirmSignOut(true)}>
                            <RiLoginBoxLine />
                            Sair
                        </ButtonSignOut>
                    </ContainerToday>

                    <Button
                        text={checkInProgress ? "Hora de saída" : "Hora de entrada"}
                        onClick={checkInOut}
                        loading={loading}
                        disabled={loading}
                    />

                    <ContainerLastDays>
                        <BiHistory />
                        <div style={{ fontSize: 12 }}>Dias anteriores</div>
                    </ContainerLastDays>
                </TopContainer>

                <PreviousDaysContainer marginTop={top_container_ref.current?.clientHeight ?? 0}>
                    {getWorkingDaysService(workingDays).map((key: string) => (
                        <PreviousDayCard disabled={loading} onClick={() => setDaySelected(key)} key={key}>
                            <PreviousDayDate>
                                {key}
                            </PreviousDayDate>
                            <b>
                                {msToTimeService(workingDays[key].workingTime)}
                            </b>
                        </PreviousDayCard>
                    ))}
                </PreviousDaysContainer>

            </Content>

            {daySelected && (
                <ModalDayChecks
                    onCancel={() => setDaySelected(null)}
                    checks={workingDays[daySelected]?.checks ?? []}
                    openModal
                    date={generateDateService(daySelected)}
                />
            )}

            {confirmSignOut && (
                <ModalConfirm
                    open
                    cancelAction={() => setConfirmSignOut(false)}
                    confirmAction={signOut}
                    content="Deseja realmente sair?"
                    cancelText="Não"
                    confirmText="Sim"
                />
            )}

        </Container>
    )
}