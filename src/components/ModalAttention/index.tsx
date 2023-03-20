import { Button } from "../Button";
import { primary } from "../../theme";
import { ModalGeneric } from "../ModalGeneric";
import { FiAlertCircle } from "react-icons/fi";
import { AttentionContainer, ButtonsContainer, ContainerIcon, Content, ContentContainer } from "./style";

interface IModalConfirmProps {
    open: boolean
    cancelText?: string
    confirmText?: string
    cancelAction: Function
    confirmAction: Function
    content: any
}

export const ModalConfirm: React.FC<IModalConfirmProps> = (props) => {
    const { open, content, cancelText = "Cancelar", confirmText = "Confirmar", cancelAction, confirmAction } = props;

    return (
        <ModalGeneric open={open} onClose={() => { }} >
            <Content>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <ContainerIcon>
                        <FiAlertCircle size={30} color={"#FFF"} />
                    </ContainerIcon>
                </div>

                <AttentionContainer>
                    <h3>Atenção</h3>
                    <ContentContainer>
                        {content}
                    </ContentContainer>
                </AttentionContainer>

                <ButtonsContainer>
                    <Button
                        onClick={() => cancelAction()}
                        style={{ background: "#FFF", color: primary }}
                        text={cancelText}
                    />
                    <Button
                        onClick={() => { confirmAction() }}
                        style={{ color: "#FFF" }}
                        text={confirmText}
                    />
                </ButtonsContainer>

            </Content>
        </ModalGeneric>
    )
}