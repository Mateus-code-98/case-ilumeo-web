import React, { useState, useCallback, useRef } from "react";
import { useApi } from "../../hooks/api";
import { useGlobal } from "../../hooks/global";
import { Button } from "../../components/Button";
import { Container, Content, Form, Title } from "./style";
import { IInputRefProps, Input } from "../../components/Input";

export const Login: React.FC = () => {
    const { signIn } = useApi()
    const { notify } = useGlobal()

    const [loading, setLoading] = useState(false)

    const input_ref = useRef<IInputRefProps>(null)

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
        <Container>
            <Content>

                <Title>
                    Ponto <b>Ilumeo</b>
                </Title>

                <Form onSubmit={handleSubmit}>
                    <Input
                        required
                        disabled={loading}
                        label="Código do usuário"
                        ref={input_ref}
                    />
                    <Button
                        text="Confirmar"
                        type="submit"
                        loading={loading}
                        disabled={loading}
                    />
                </Form>

            </Content>
        </Container>
    )
}