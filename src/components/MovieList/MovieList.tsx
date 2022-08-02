import { Grid } from "@mui/material";
import React from "react";
import { MoviesListType, MoviesType } from "../../types";
import { MoviesContainer } from "./styles";
import { Movie } from "..";
interface MovieListProps {
    movies?: MoviesListType | undefined;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <MoviesContainer container className="moviesContainer">
            {movies &&
                movies.results.map((movie: MoviesType, i: number) => (
                    <Movie key={i} movie={movie} i={i} />
                ))}
        </MoviesContainer>
    );
};

export default MovieList;
