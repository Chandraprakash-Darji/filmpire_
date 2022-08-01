import {
    Box,
    CircularProgress,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList } from "..";
import { useAppSelector } from "../../app/hooks";
import { styled } from "@mui/styles";

const BoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        marginTop: "3rem",
    },
}));

const Movies: React.FC = () => {
    const [page, setPage] = useState(1);
    const { genreIdOrCateogaryName, searchQuery } = useAppSelector(
        (state) => state.currentGenreOrCateogory
    );
    const { data, error, isFetching } = useGetMoviesQuery({
        genreIdOrCateogaryName,
        page,
        searchQuery,
    });
    const isMobile = useMediaQuery("(max-width:900px)");

    if (isFetching)
        return (
            <BoxWrapper>
                <CircularProgress size={"4rem"} />
            </BoxWrapper>
        );

    if (!data?.results.length)
        return (
            <BoxWrapper>
                <Typography variant="h4">
                    No movies match that name.
                    <br />
                    Please Search for something else.
                </Typography>
            </BoxWrapper>
        );

    if (error)
        return (
            <BoxWrapper>
                <Typography variant="h4">
                    Error Ocurred Try Again later...
                </Typography>
            </BoxWrapper>
        );
    return (
        <BoxWrapper>
            <MovieList movies={data} />
        </BoxWrapper>
    );
};

export default Movies;
