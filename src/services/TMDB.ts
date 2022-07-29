import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GenresListType } from "../types/Genres";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

import { MovieListType } from "../types/MoviesType";

export const tmdbApi = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
    endpoints: (builder) => ({
        //* Get Genres
        getGenres: builder.query<GenresListType, void>({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //* Get Mpovies by [Type]
        getMovies: builder.query<MovieListType, number>({
            query: (page) => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
        }),
    }),
});

export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
