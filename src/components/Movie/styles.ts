import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";

export const MovieContainer = styled(Grid)(() => ({
    padding: "0",
    display: "flex",
    justifyContent: "center",
}));

export const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    textOverflow: "ellipsis",
    width: "230px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    margintop: "10px",
    marginBottom: "0",
    textAlign: "center",
}));
export const Links = styled(Link)(({ theme }) => ({
    alignItems: "center",
    fontWwight: "bolder",
    textDecoration: "none",
    [theme.breakpoints.up("sm")]: {
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    "&:hover": {
        cursor: "pointer",
    },
}));

export const Image = styled("img")(() => ({
    borderRadius: "20px",
    height: "300px",
    marginBottom: "10px",
    transition: "all 200ms linear",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));
