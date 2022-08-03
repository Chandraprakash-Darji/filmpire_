import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GenresListType, SingleMovieType } from "../types";

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
import { MoviesListType } from "../types";

export const tmdbApi: any = createApi({
    reducerPath: "tmdbApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
    endpoints: (builder) => ({
        //* Get Genres
        getGenres: builder.query<GenresListType, void>({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),

        //* Get Mpovies by [Type]
        getMovies: builder.query<
            MoviesListType,
            {
                genreIdOrCateogaryName:
                    | number
                    | "popular"
                    | "top_rated"
                    | "upcoming";
                page: number;
                searchQuery: string;
            }
        >({
            query: ({ genreIdOrCateogaryName, page, searchQuery }) => {
                //* get movies by Search
                if (searchQuery) {
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* get movies by cateogory
                if (
                    genreIdOrCateogaryName &&
                    typeof genreIdOrCateogaryName === "string"
                ) {
                    return `movie/${genreIdOrCateogaryName}?page=${page}&api_key=${tmdbApiKey}`;
                }

                //* get movies by genres
                if (
                    genreIdOrCateogaryName &&
                    typeof genreIdOrCateogaryName === "number"
                ) {
                    return `discover/movie?with_genres=${genreIdOrCateogaryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //* Get popular Movies === DEFAULT
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            },
        }),
        //* Get Movie Details
        getMovie: builder.query<SingleMovieType, number>({
            query: (id) =>
                `/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
        }),
        //* Get User Specific MovieList
        getRecomendations: builder.query<
            MoviesListType,
            { movie_id: number; list: number }
        >({
            query: ({ movie_id, list }) =>
                `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),
        //* Get Actor Data
        
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieQuery,
    useGetRecomendationsQuery,
} = tmdbApi;
