import {
    ArrowBack,
    Favorite,
    FavoriteBorderOutlined,
    Language,
    PlusOne,
    Remove,
    Theaters,
    Movie as MovieIcon,
    LanOutlined,
} from "@mui/icons-material";
import {
    Button,
    ButtonGroup,
    CircularProgress,
    Grid,
    Modal,
    Rating,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GenreIconList from "../../assets/genres";
import { selectGenreOrCateogary } from "../../features/currentGenreOrCateograry";
import {
    useGetListQuery,
    useGetMovieQuery,
    useGetRecomendationsQuery,
} from "../../services/TMDB";
import {
    SingleMovieType,
    GenresType,
    returnQueryType,
    MoviesListType,
} from "../types";
import MovieList from "../MovieList/MovieList";
import { Pagination } from "..";
import { BoxWrapper, ContainerSpace, Poster } from "../styles";
import {
    ButtonContainer,
    CastImage,
    GenerImage,
    GenresContainer,
    StyledModal,
    Video,
} from "./styles";

const MovieInformation = () => {
    const { user } = useAppSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    // States
    const [page, setPage] = useState(1);
    const [isMovieFav, setisMovieFav] = useState<boolean | "0">(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState<boolean | "0">(
        false
    );
    const [open, setOpen] = useState(false);
    // Querys
    // For fetching movie detail
    const { data, isFetching, error }: returnQueryType<SingleMovieType> =
        useGetMovieQuery(id);
    // For fetching recomendations
    const {
        data: recomendations,
        isFetching: recomendationsIsFetching,
        error: recomendationsError,
    }: returnQueryType<MoviesListType> = useGetRecomendationsQuery({
        movie_id: id,
        list: "/recommendations",
    });
    // For Fetching use specific Lists
    // favoriteList
    const { data: favoriteListMovies }: returnQueryType<MoviesListType> =
        useGetListQuery({
            listName: "favorite/movies",
            accountId: user && user.id,
            sessionId: localStorage.getItem("session_id"),
            page: 1,
        });
    // Watchlist
    const { data: watchListMovies }: returnQueryType<MoviesListType> =
        useGetListQuery({
            listName: "watchlist/movies",
            accountId: user && user.id,
            sessionId: localStorage.getItem("session_id"),
            page: 1,
        });
    useEffect(() => {
        if (favoriteListMovies)
            setisMovieFav(
                !!favoriteListMovies.results.find(
                    (movie) => movie?.id === data?.id
                )
            );
    }, [favoriteListMovies, data]);

    useEffect(() => {
        if (watchListMovies)
            setIsMovieWatchlisted(
                !!watchListMovies.results.find(
                    (movie) => movie?.id === data?.id
                )
            );
    }, [watchListMovies, data]);

    const dispatch = useAppDispatch();

    const addToFav = async () => {
        const state = isMovieFav;
        setisMovieFav("0");
        if (!user) return;
        await axios.post(
            `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
                process.env.REACT_APP_TMDB_KEY
            }&session_id=${localStorage.getItem("session_id")}`,
            {
                media_type: "movie",
                media_id: id,
                favorite: !isMovieFav,
            }
        );
        setisMovieFav(!state);
    };
    const addToWatchList = async () => {
        const state = isMovieWatchlisted;
        setIsMovieWatchlisted("0");
        if (!user) return;
        await axios.post(
            `https://api.themoviedb.org/3/account/${
                user.id
            }/watchlist?api_key=${
                process.env.REACT_APP_TMDB_KEY
            }&session_id=${localStorage.getItem("session_id")}`,
            {
                media_type: "movie",
                media_id: id,
                watchlist: !isMovieWatchlisted,
            }
        );
        setIsMovieWatchlisted(!state);
    };

    if (isFetching)
        return (
            <BoxWrapper>
                <CircularProgress size={"4rem"} />
            </BoxWrapper>
        );

    if (error)
        return (
            <BoxWrapper>
                <Link to="/">Error Ocurred Try Again later...</Link>
            </BoxWrapper>
        );
    return (
        <BoxWrapper>
            <ContainerSpace container>
                <Grid
                    item
                    sm={12}
                    md={4}
                    lg={4}
                    style={{
                        maxWidth: "30rem",
                        justifyContent: "center",
                        display: "flex",
                    }}
                >
                    <Poster
                        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                        alt={data?.title}
                    />
                </Grid>
                <Grid item container direction="column" md={6}>
                    <Typography variant="h3" align="center" gutterBottom>
                        {data?.title} ({data.release_date.split("-")[0]})
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        {data?.tagline}
                    </Typography>
                    <ContainerSpace item style={{ flexDirection: "column" }}>
                        <Box display="flex" justifyContent="center">
                            <Rating readOnly value={data?.vote_average / 2} />
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                style={{ marginLeft: "10px" }}
                            >
                                {data?.vote_average} / 10
                            </Typography>
                        </Box>

                        <Typography variant="h6" align="center" gutterBottom>
                            {data?.runtime}min /{" "}
                            {data?.spoken_languages &&
                                data?.spoken_languages[0].name}
                        </Typography>
                    </ContainerSpace>
                    <GenresContainer item>
                        {data?.genres?.map((genre: GenresType) => (
                            <Link
                                key={genre.id}
                                className="Links"
                                to="/"
                                onClick={() =>
                                    dispatch(selectGenreOrCateogary(genre.id))
                                }
                            >
                                <GenerImage
                                    src={
                                        GenreIconList[genre.name.toLowerCase()]
                                    }
                                    height={30}
                                />
                                <Typography
                                    variant="subtitle1"
                                    color="textPrimary"
                                >
                                    {genre?.name}
                                </Typography>
                            </Link>
                        ))}
                    </GenresContainer>
                    <Typography
                        variant="h5"
                        gutterBottom
                        style={{ marginTop: "10px" }}
                    >
                        OverView
                    </Typography>
                    <Typography style={{ marginBottom: "2rem" }}>
                        {data?.overview}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Top Cast
                    </Typography>
                    <Grid item container spacing={2}>
                        {data?.credits?.cast?.slice(0, 6).map(
                            (character, i) =>
                                character.profile_path && (
                                    <Grid
                                        key={i}
                                        item
                                        component={Link}
                                        to={`/actors/${character.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <CastImage
                                            src={`https://image.tmdb.org/t/p/w500${character.profile_path}`}
                                            alt={character.name}
                                        />
                                        <Typography color="textPrimary">
                                            {character.name}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {character.character.split("/")[0]}
                                        </Typography>
                                    </Grid>
                                )
                        )}
                    </Grid>
                    <Grid item container style={{ marginTop: "2rem" }}>
                        <ButtonContainer>
                            <Grid item>
                                <ButtonGroup size="medium" variant="outlined">
                                    <Button
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={data?.homepage}
                                        endIcon={<Language />}
                                    >
                                        Website
                                    </Button>
                                    <Button
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                        endIcon={<MovieIcon />}
                                    >
                                        IMDB
                                    </Button>
                                    <Button
                                        onClick={() => setOpen(true)}
                                        href="#"
                                        endIcon={<Theaters />}
                                    >
                                        Trailer
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item>
                                <ButtonGroup
                                    size="medium"
                                    variant="outlined"
                                    style={{
                                        display: "flex",
                                    }}
                                >
                                    <Button
                                        onClick={addToFav}
                                        endIcon={
                                            isMovieFav === "0" ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size="20px"
                                                />
                                            ) : isMovieFav === true ? (
                                                <FavoriteBorderOutlined />
                                            ) : (
                                                <Favorite />
                                            )
                                        }
                                        disabled={isMovieFav === "0"}
                                    >
                                        {isMovieFav === true
                                            ? "unfavorite"
                                            : "favorite"}
                                    </Button>
                                    <Button
                                        onClick={addToWatchList}
                                        endIcon={
                                            isMovieWatchlisted === "0" ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size="20px"
                                                />
                                            ) : isMovieWatchlisted === true ? (
                                                <Remove />
                                            ) : (
                                                <PlusOne />
                                            )
                                        }
                                        disabled={isMovieWatchlisted === "0"}
                                    >
                                        watchlist
                                    </Button>
                                    <Button
                                        endIcon={<ArrowBack />}
                                        sx={{ borderColor: "primary.main" }}
                                        onClick={() => navigate(-1)}
                                    >
                                        <Typography
                                            color="inherit"
                                            variant="subtitle2"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Back
                                        </Typography>
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </ButtonContainer>
                    </Grid>
                </Grid>
                <Box marginTop="5rem" width="100%">
                    <Typography variant="h3" gutterBottom align="center">
                        You might also like
                    </Typography>
                    {/* Loopp through recomended movies */}
                    {recomendationsIsFetching && (
                        <CircularProgress size={"4rem"} />
                    )}
                    {recomendationsError && (
                        <Typography>
                            Error Ocurred Try Again later...
                        </Typography>
                    )}
                    {recomendations && (
                        <>
                            <MovieList
                                movies={recomendations}
                                numberOfMovies={12}
                            />
                            <Pagination
                                currentPage={page}
                                setPage={setPage}
                                totalPages={recomendations.total_pages}
                            />
                        </>
                    )}
                </Box>

                {data?.videos?.results.length > 0 && (
                    <StyledModal
                        closeAfterTransition
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <Video
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </StyledModal>
                )}
            </ContainerSpace>
        </BoxWrapper>
    );
};

export default MovieInformation;
