import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const Login: React.FC = () => {
    return (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 30, flex: 1, justifyContent: "center" }}>
                <div style={{ fontSize: 18 }}>
                    Ponto <b>Ilumeo</b>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <Input label="Código do usuário" />
                    <Button>
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    )
}