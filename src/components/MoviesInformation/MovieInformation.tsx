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
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import GenreIconList from "../../assets/genres";
import { selectGenreOrCateogary } from "../../features/currentGenreOrCateograry";
import { useGetMovieCastQuery, useGetMovieQuery } from "../../services/TMDB";
import { SingleMovieType, GenresType, creditsType } from "../../types";
import {
    BoxWrapper,
    ButtonContainer,
    CastImage,
    ContainerSpace,
    GenerImage,
    GenresContainer,
    Poster,
} from "./style";

const MovieInformation = () => {
    const { id } = useParams();
    const isMovieFav = true;
    const isMovieWatchlisted = false;
    const {
        data,
        isFetching,
        error,
    }: { data: SingleMovieType; isFetching: boolean; error: boolean } =
        useGetMovieQuery(id);

    const {
        data: movieCast,
        isFetching: movieCastIsFetching,
        error: movieCastError,
    }: {
        data: creditsType;
        isFetching: boolean;
        error: boolean;
    } = useGetMovieCastQuery(id);

    const dispatch = useAppDispatch();

    const addToFav = () => {};
    const addToWatchList = () => {};

    if (isFetching || movieCastIsFetching)
        return (
            <BoxWrapper>
                <CircularProgress size={"4rem"} />
            </BoxWrapper>
        );

    if (error || movieCastError)
        return (
            <BoxWrapper>
                <Link to="/">Error Ocurred Try Again later...</Link>
            </BoxWrapper>
        );
    console.log(data, movieCast);
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
                        {movieCast?.cast?.slice(0, 6).map(
                            (character, i) =>
                                character.profile_path && (
                                    <Grid
                                        key={i}
                                        item
                                        xs={4}
                                        md={2}
                                        component={Link}
                                        to={`/person/${character.id}`}
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
                            <Grid item xs={12} sm={6}>
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
                                        onClick={() => {}}
                                        href="#"
                                        endIcon={<Theaters />}
                                    >
                                        Trailer
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <ButtonGroup
                                    size="medium"
                                    variant="outlined"
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
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
            </ContainerSpace>
        </BoxWrapper>
    );
};

export default MovieInformation;
