import { Grid } from "@mui/material";
import React from "react";
import { MovieListType, MovieType } from "../../types/MoviesType";
import { MoviesContainer } from "./styles";
import { Movie } from "..";
interface MovieListProps {
    movies?: MovieListType | undefined;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <MoviesContainer container className="moviesContainer">
            {movies &&
                movies.results.map((movie: MovieType, i: number) => (
                    <Movie key={i} movie={movie} i={i} />
                ))}
        </MoviesContainer>
    );
};

export default MovieList;
