import { ExitToApp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

const Profile = () => {
    const { user } = useAppSelector((state) => state.user);
    const favoriteMovies = [];
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
            {!favoriteMovies.length ? (
                <Typography variant="h5">
                    {" "}
                    Add favorite or watchlist some movies to see them here!
                </Typography>
            ) : (
                <Box>FAVORITE MOVIES</Box>
            )}
        </Box>
    );
};

export default Profile;
