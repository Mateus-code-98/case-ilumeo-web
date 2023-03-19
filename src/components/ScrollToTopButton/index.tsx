import { Container } from "./style";
import { BiUpArrowAlt } from "react-icons/bi";

interface IContainerProps {
    open: boolean
}

export const ScrollToTopButton: React.FC<IContainerProps> = (props) => {
    const { open } = props;

    const handleClick = () => window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return (
        <Container open={open} onClick={handleClick}>
            <BiUpArrowAlt color={"#FFF"} />
        </Container>
    )
};