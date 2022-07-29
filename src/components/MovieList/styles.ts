import { Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const MoviesContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    dlexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
        justifyContent: "center",
    },
}));
