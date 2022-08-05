import {
    Box,
    CircularProgress,
    Typography,
    useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { MovieList, Pagination } from "..";
import { useAppSelector } from "../../app/hooks";
import { styled } from "@mui/styles";
import { BoxWrapper } from "../styles";
import { MoviesListType, returnQueryType } from "../types";

const Movies: React.FC = () => {
    const [page, setPage] = useState(1);
    const { genreIdOrCateogaryName, searchQuery } = useAppSelector(
        (state) => state.currentGenreOrCateogory
    );
    const { data, error, isFetching }: returnQueryType<MoviesListType> =
        useGetMoviesQuery({
            genreIdOrCateogaryName,
            page,
            searchQuery,
        });
    const md = useMediaQuery("(min-width:900px)");
    if (isFetching)
        return (
            <BoxWrapper style={{ marginTop: md ? "0" : "3rem" }}>
                <CircularProgress size={"4rem"} />
            </BoxWrapper>
        );

    if (!data?.results.length)
        return (
            <BoxWrapper style={{ marginTop: md ? "0" : "3rem" }}>
                <Typography variant="h4">
                    No movies match that name.
                    <br />
                    Please Search for something else.
                </Typography>
            </BoxWrapper>
        );

    if (error)
        return (
            <BoxWrapper style={{ marginTop: md ? "0" : "3rem" }}>
                <Typography variant="h4">
                    Error Ocurred Try Again later...
                </Typography>
            </BoxWrapper>
        );
    console.log(data);
    return (
        <BoxWrapper style={{ marginTop: md ? "0" : "3rem" }}>
            <MovieList movies={data} />
            <Pagination
                currentPage={page}
                setPage={setPage}
                totalPages={data.total_pages}
            />
        </BoxWrapper>
    );
};

export default Movies;
