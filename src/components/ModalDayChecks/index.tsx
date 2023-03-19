import { gray } from "../../theme";
import { TiDelete } from "react-icons/ti";
import { ICheckProps } from "../../interfaces";
import { ModalGeneric } from "../ModalGeneric";
import { getHours } from "../../services/getHours.service";
import { msToTimeService } from "../../services/msToTime.service";
import { correctDateService } from "../../services/correctDate.service";
import { calcWorkingTimeService } from "../../services/calcWorkingTime.service";
import { Column, Container, ContainerClose, ContainerTable, Description, Header, Line, Table, TD, TH, Title } from "./style";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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
                                Confira abaixo o relatório de checagens de pontos diárias.
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

                <ContainerTable>
                    <Table>
                        <thead>
                            <tr>
                                <TH>Entrada</TH>
                                <TH>Saída</TH>
                                <TH>Tempo decorrido</TH>
                            </tr>
                        </thead>
                        <tbody>
                            {checks.map((check, index) => (
                                <tr key={index + " - check"}>
                                    <TD>{getHours(check.createdAt)}</TD>
                                    <TD>{check.finished ? getHours(check.updatedAt) : "-"}</TD>
                                    <TD>{msToTimeService(calcWorkingTimeService([check], 0))}</TD>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ContainerTable>
                <div style={{ paddingBottom: 10, paddingRight: 20, marginTop: -10, color: gray, fontSize: 13, textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 5 }}>
                    Total
                    <FiArrowRight />
                    {msToTimeService(calcWorkingTimeService(checks, 0))}
                </div>
            </Container>
        </ModalGeneric>
    )
};