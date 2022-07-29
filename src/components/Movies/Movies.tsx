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

const Movies: React.FC = () => {
    const { data, error, isFetching } = useGetMoviesQuery(1);

    if (isFetching)
        return (
            <Box display={"flex"} justifyContent="center">
                <CircularProgress size={"4rem"} />
            </Box>
        );

    if (!data?.results.length)
        return (
            <Box display="flex" alignContent={"center"} mt="20px">
                <Typography variant="h4">
                    No movies match that name.
                    <br />
                    Please Search for something else.
                </Typography>
            </Box>
        );

    if (error)
        return (
            <Box display="flex" alignContent={"center"} mt="20px">
                <Typography variant="h4">
                    Error Ocurred Try Again later...
                </Typography>
            </Box>
        );
    return (
        <div>
            <MovieList movies={data} />
        </div>
    );
};

export default Movies;
