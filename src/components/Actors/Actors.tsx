import { ArrowBack } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    useGetActorMoviesQuery,
    useGetActorDataQuery,
} from "../../services/TMDB";
import { ActorType, MoviesListType, returnQueryType } from "../types";
import MovieList from "../MovieList/MovieList";
import { Pagination } from "..";
import { BoxWrapper, ContainerSpace, Poster } from "../styles";

export const ButtonContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "2rem",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignIntems: "center",
        justifyContent: "center",
    },
}));

const Actors = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isFetching, error }: returnQueryType<ActorType> =
        useGetActorDataQuery(id);

    const {
        data: MovieData,
        isFetching: MovieDataIsFetching,
        error: MovieDataError,
    }: returnQueryType<MoviesListType> = useGetActorMoviesQuery({ id, page });
    console.log(MovieData);

    if (isFetching)
        return (
            <BoxWrapper>
                <CircularProgress size={"4rem"} />
            </BoxWrapper>
        );

    if (error)
        return (
            <BoxWrapper
                style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                    fontWeight: "600",
                    fontSize: "2rem",
                }}
            >
                Error Ocurred Try Again later...
                <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    sx={{ borderColor: "primary.main" }}
                    onClick={() => navigate(-1)}
                >
                    <Typography
                        to="/"
                        style={{ textDecoration: "none" }}
                        component={Link}
                        color="inherit"
                    >
                        Back
                    </Typography>
                </Button>
            </BoxWrapper>
        );
    console.log(data);
    return (
        <BoxWrapper>
            <ContainerSpace container>
                <Grid
                    item
                    sm={12}
                    md={4}
                    style={{
                        maxWidth: "30rem",
                        justifyContent: "center",
                        display: "flex",
                    }}
                >
                    <Poster
                        src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                        alt={data?.name}
                    />
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    md={7}
                    style={{ alignSelf: "center" }}
                >
                    <Typography variant="h2" gutterBottom>
                        {data?.name}
                    </Typography>
                    {data?.birthday && (
                        <Typography variant="h5" gutterBottom>
                            Born: {new Date(data?.birthday).toDateString()}
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        style={{ marginBottom: "2rem" }}
                        paragraph
                        align="justify"
                    >
                        {data?.biography || "No biography available"}
                    </Typography>
                    <ButtonContainer>
                        <Button
                            variant="contained"
                            href={`https://www.imdb.com/name/${data?.imdb_id}`}
                            target="_blank"
                            rel="noopner"
                        >
                            IMDB
                        </Button>
                        <Button
                            startIcon={<ArrowBack />}
                            variant="outlined"
                            sx={{ borderColor: "primary.main" }}
                            onClick={() => navigate(-1)}
                        >
                            <Typography
                                to="/"
                                style={{ textDecoration: "none" }}
                                component={Link}
                                color="inherit"
                            >
                                Back
                            </Typography>
                        </Button>
                    </ButtonContainer>
                </Grid>
                <Box
                    margin="3rem 0"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                >
                    <Typography variant="h3" gutterBottom align="center">
                        Movies
                    </Typography>
                    {/* Loopp through recomended movies */}
                    {MovieDataIsFetching && <CircularProgress size={"4rem"} />}
                    {MovieDataError && (
                        <Typography>
                            Error Ocurred Try Again later...
                        </Typography>
                    )}
                    {MovieData && (
                        <>
                            <MovieList movies={MovieData} numberOfMovies={12} />
                            <Pagination
                                currentPage={page}
                                setPage={setPage}
                                totalPages={MovieData.total_pages}
                            />
                        </>
                    )}
                </Box>
            </ContainerSpace>
        </BoxWrapper>
    );
};

export default Actors;
