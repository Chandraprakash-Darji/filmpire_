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
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GenreIconList from "../../assets/genres";
import { selectGenreOrCateogary } from "../../features/currentGenreOrCateograry";
import {
    useGetMovieQuery,
    useGetRecomendationsQuery,
} from "../../services/TMDB";
import {
    SingleMovieType,
    GenresType,
    returnQueryType,
    MoviesListType,
} from "../../types";
import MovieList from "../MovieList/MovieList";
import {
    BoxWrapper,
    ButtonContainer,
    CastImage,
    ContainerSpace,
    GenerImage,
    GenresContainer,
    Poster,
    StyledModal,
    Video,
} from "./style";

const MovieInformation = () => {
    const { id } = useParams();
    const isMovieFav = true;
    const isMovieWatchlisted = false;
    const [open, setOpen] = useState(false);
    const { data, isFetching, error }: returnQueryType<SingleMovieType> =
        useGetMovieQuery(id);
    const {
        data: recomendations,
        isFetching: recomendationsIsFetching,
        error: recomendationsError,
    }: returnQueryType<MoviesListType> = useGetRecomendationsQuery({
        movie_id: id,
        list: "/recommendations",
    });

    const dispatch = useAppDispatch();

    const addToFav = () => {};
    const addToWatchList = () => {};

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
    console.log(data);
    console.log(recomendations);
    return (
        <BoxWrapper>
            <ContainerSpace container>
                <Grid item md={12} lg={4} display="flex">
                    <Poster
                        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                        alt={data?.title}
                    />
                </Grid>
                <Grid item container direction="column" lg={7}>
                    <Typography variant="h3" align="center" gutterBottom>
                        {data?.title} ({data.release_date.split("-")[0]})
                    </Typography>
                    <Typography variant="h5" align="center" gutterBottom>
                        {data?.tagline}
                    </Typography>
                    <ContainerSpace item>
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
                            {data?.runtime}min{" "}
                            {data?.spoken_languages &&
                            data?.spoken_languages.length > 0
                                ? `/ ${data?.spoken_languages[0].name}`
                                : ""}
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
                                            isMovieFav ? (
                                                <FavoriteBorderOutlined />
                                            ) : (
                                                <Favorite />
                                            )
                                        }
                                    >
                                        {isMovieFav ? "unfavorite" : "favorite"}
                                    </Button>
                                    <Button
                                        onClick={addToWatchList}
                                        endIcon={
                                            isMovieWatchlisted ? (
                                                <Remove />
                                            ) : (
                                                <PlusOne />
                                            )
                                        }
                                    >
                                        Watchlist
                                    </Button>
                                    <Button
                                        endIcon={<ArrowBack />}
                                        sx={{ borderColor: "primary.main" }}
                                    >
                                        <Typography
                                            component={Link}
                                            to="/"
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
                        <MovieList
                            movies={recomendations}
                            numberOfMovies={12}
                        />
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
