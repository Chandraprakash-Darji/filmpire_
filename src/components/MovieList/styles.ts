import { Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const MoviesContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    rowGap: "25px",
    columnGap: "10px",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        justifyContent: "center",
    },
}));
