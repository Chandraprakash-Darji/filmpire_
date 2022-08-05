import { SetStateAction } from "react";
import { StyledButton, Container, PageNumber } from "./styles";

type PaginationProps = {
    currentPage: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    totalPages: number;
};

const Pagination = ({ currentPage, setPage, totalPages }: PaginationProps) => {
    const handlePrev = () => {
        setPage((prev) => prev - 1);
    };
    const handleNext = () => {
        setPage((prev) => prev + 1);
    };

    if (totalPages === 0) return null;
    return (
        <Container>
            <StyledButton
                onClick={handlePrev}
                variant="contained"
                color="primary"
                type="button"
                disabled={currentPage <= 1}
            >
                Prev
            </StyledButton>
            <PageNumber variant="h4">{currentPage}</PageNumber>
            <StyledButton
                onClick={handleNext}
                variant="contained"
                color="primary"
                type="button"
                disabled={currentPage >= totalPages}
            >
                Next
            </StyledButton>
        </Container>
    );
};

export default Pagination;
