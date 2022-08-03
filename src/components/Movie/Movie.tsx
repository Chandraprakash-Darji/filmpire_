import { Grow, Rating, Tooltip } from "@mui/material";
import { MoviesType } from "../../types";
import { Image, Links, MovieContainer, Title } from "./style";

type MovieProps = {
    i: number;
    movie: MoviesType;
};

const Movie = ({ movie, i }: MovieProps) => {
    return (
        <MovieContainer item>
            <Grow in key={i} timeout={250 * (i + 1)}>
                <Links to={`/movie/${movie.id}`}>
                    <Image
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://www.fillmurray.com/200/300"
                        }
                        alt={movie.title}
                        loading="lazy"
                    />
                    <Title variant="h5">{movie.title}</Title>
                    <Tooltip
                        disableTouchListener
                        title={`${movie.vote_average} / 10`}
                    >
                        <div>
                            <Rating
                                readOnly
                                value={movie.vote_average / 2}
                                precision={0.1}
                            />
                        </div>
                    </Tooltip>
                </Links>
            </Grow>
        </MovieContainer>
    );
};

export default Movie;
