import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useGetListQuery } from "../../services/TMDB";
import { MoviesListType, returnQueryType } from "../types";
import { RatedCards } from "..";
const Profile = () => {
    const { user } = useAppSelector((state) => state.user);

    // For Fetching use specific Lists
    // favoriteList

    const {
        data: favoriteListMovies,
        refetch: refetchfavoriteListMovies,
    }: returnQueryType<MoviesListType> = useGetListQuery({
        listName: "favorite/movies",
        accountId: user && user.id,
        sessionId: localStorage.getItem("session_id"),
        page: 1,
    });
    // Watchlist
    const {
        data: watchListMovies,
        refetch: refetchwatchListMovies,
    }: returnQueryType<MoviesListType> = useGetListQuery({
        listName: "watchlist/movies",
        accountId: user && user.id,
        sessionId: localStorage.getItem("session_id"),
        page: 1,
    });

    useEffect(() => {
        refetchfavoriteListMovies();
        refetchwatchListMovies();
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <Box ml="2rem">
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4" gutterBottom>
                    My Profile
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Logout <ExitToApp />
                </Button>
            </Box>
            {!favoriteListMovies?.results.length &&
            !watchListMovies?.results.length ? (
                <Typography variant="h5">
                    {" "}
                    Add favorite or watchlist some movies to see them here!
                </Typography>
            ) : (
                <Box>
                    <RatedCards
                        title="Favrite Movies"
                        data={favoriteListMovies}
                    />
                    <RatedCards
                        title="WatchList Movies"
                        data={watchListMovies}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Profile;
