import { gray } from "../../theme";
import { TiDelete } from "react-icons/ti";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { ICheckProps } from "../../interfaces";
import { ModalGeneric } from "../ModalGeneric";
import { getHours } from "../../services/getHours.service";
import { msToTimeService } from "../../services/msToTime.service";
import { correctDateService } from "../../services/correctDate.service";
import { calcWorkingTimeService } from "../../services/calcWorkingTime.service";
import { Column, Container, ContainerClose, ContainerTable, Description, Header, Line, LineTD, LineTH, Table, TD, TH, Title } from "./style";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";

interface IModalDayChecksProps {
    onCancel: Function;
    openModal: boolean;
    checks: ICheckProps[];
    date: Date;
};

export const ModalDayChecks: React.FC<IModalDayChecksProps> = (props) => {
    const { onCancel, openModal, checks, date } = props;

    return (
        <ModalGeneric open={openModal} onClose={() => onCancel()}>
            <Container>
                <Header>
                    <Line style={{ gap: 10 }}>
                        <Column style={{ gap: 5 }}>
                            <Title>
                                Relatório de checagens de pontos
                            </Title>

                            <Description>
                                Confira abaixo o relatório de checagens de pontos.
                            </Description>
                            <Description>
                                Referente ao dia {correctDateService(date, { month_in_extension: true, no_have_time: true })}.
                            </Description>
                        </Column>
                    </Line>
                    <div>
                        <ContainerClose onClick={() => onCancel()}>
                            <TiDelete color={"#FFF"} size={20} />
                        </ContainerClose>
                    </div>
                </Header>

                <div style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
                    <ContainerTable>
                        <Table>
                            <thead>
                                <tr>
                                    <TH>
                                        <LineTH>
                                            <BiArrowToTop size={14} />
                                            Entrada
                                        </LineTH>
                                    </TH>
                                    <TH>
                                        <LineTH>
                                            <BiArrowToBottom size={14} />
                                            Saída
                                        </LineTH>
                                    </TH>
                                    <TH>
                                        <LineTH>
                                            <FiClock size={14} />
                                            Tempo decorrido
                                        </LineTH>
                                    </TH>
                                </tr>
                            </thead>
                            <tbody>
                                {checks.map((check, index) => (
                                    <tr key={index + " - check"}>
                                        <TD>
                                            <LineTD>
                                                {getHours(check.createdAt)}
                                            </LineTD>
                                        </TD>
                                        <TD>
                                            <LineTD>
                                                {check.finished ? getHours(check.updatedAt) : "-"}
                                            </LineTD>
                                        </TD>
                                        <TD>
                                            <LineTD>
                                                {msToTimeService(calcWorkingTimeService([check], 0), true)}
                                            </LineTD>
                                        </TD>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </ContainerTable>
                    <div style={{ paddingBottom: 10, paddingRight: 20, marginTop: -10, color: gray, fontSize: 13, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 5 }}>
                        Total
                        <FiArrowRight />
                        {msToTimeService(calcWorkingTimeService(checks, 0), true)}
                    </div>
                </div>
            </Container>
        </ModalGeneric>
    )
};