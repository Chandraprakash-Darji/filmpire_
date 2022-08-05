import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Movie } from "..";
import { MoviesListType, MoviesType } from "../types";

type RatedCardProps = {
    title: string;
    data: MoviesListType;
};

const RatedCards = ({ title, data }: RatedCardProps) => {
    return (
        <Box mt="2rem">
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>
            <Box display="flex" flexWrap="wrap" gap=".5rem" rowGap="1.5rem">
                {data?.results.map((movie: MoviesType, i: number) => (
                    <Movie key={movie.id} movie={movie} i={i} />
                ))}
            </Box>
        </Box>
    );
};

export default RatedCards;
