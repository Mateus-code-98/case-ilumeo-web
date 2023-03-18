import React, { useState, useCallback } from "react";
import { IInputRefProps, Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useApi } from "../../hooks/api";
import { useGlobal } from "../../hooks/global";

export const Login: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const input_ref = React.useRef<IInputRefProps>(null)

    const { notify } = useGlobal()

    const { signIn } = useApi()

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        try {
            const code = input_ref.current?.getValue() ?? ""
            await signIn({ code })
        } catch (err: any) {
            const error = err.response ? err.response.data : "SERVER ERROR"
            if (error !== "SERVER ERROR") notify("Nenhum colaborador cadastrado com este código!", "alert")
            else notify("ERRO INTERNO DO SISTEMA!", "error")
        }
        setLoading(false)
    }, [input_ref])

    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 30, flex: 1, justifyContent: "center" }}>
                <div style={{ fontSize: 18 }}>
                    Ponto <b>Ilumeo</b>
                </div>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Input required disabled={loading} label="Código do usuário" ref={input_ref} />
                    <Button type="submit" loading={loading} disabled={loading}>
                        Confirmar
                    </Button>
                </form>
            </div>
        </div>
    )
}