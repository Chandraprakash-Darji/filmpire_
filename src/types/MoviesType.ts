export type MovieType = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: number;
    release_date: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MovieListType= {
    page: number;
    results: MovieType[];
    total_pages: number;
    total_results: number;
}
