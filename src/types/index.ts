export type GenresType = {
    id: number;
    name: string;
};

export type GenresListType = {
    genres: GenresType[];
};

export type MoviesType = {
    poster_path: number;
    title: string;
    vote_average: number;
    id: number;
    [key: string]: any;
};

export type MoviesListType = {
    page: number;
    results: MoviesType[];
    total_pages: number;
    total_results: number;
};

type creditsType = {
    cast: {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
    }[];
    crew: {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: 0.6;
        profile_path: string | null;
        credit_id: string;
        department: string;
        job: string;
    }[];
};

export type VideosType = {
    name: string;
    site: "YouTube";
    type: "Trailer";
    key: string;
    [key: string]: any;
};

export type SingleMovieType = GenresListType & {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    runtime: number | null;
    vote_average: number;
    spoken_languages:
        | {
              english_name: string;
              iso_639_1: string;
              name: string;
          }[]
        | null;
    overview: string | null;
    tagline: string | null;
    credits: creditsType;
    videos: { results: VideosType[] };
    [key: string]: any;
};

export type returnQueryType<T> = {
    data: T;
    isFetching: boolean;
    error: boolean;
};

export type ActorType = {
    birthday: string | null;
    id: number;
    name: string;
    biography: string;
    profile_path: string;
    imdb_id: string;
    [key: string]: any;
};
