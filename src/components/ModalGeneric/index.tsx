import React, { PropsWithChildren, useEffect } from "react";
import { BaseModal, Container } from "./style";
import { calculeteVH } from "../../services/calculeteVH.service";

interface ModalProps extends PropsWithChildren {
    open: boolean;
    onClose: Function;
    backgroundVisible?: boolean;
};

export const ModalGeneric: React.FC<ModalProps> = (props) => {
    const { open, onClose, children, backgroundVisible = false } = props;

    useEffect(() => { calculeteVH() }, []);

    return (
        <BaseModal BackdropProps={{ invisible: backgroundVisible }} open={open} onClose={() => onClose()}>
            <Container>
                {children}
            </Container>
        </BaseModal>
    )
};