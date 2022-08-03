import { Height } from "@mui/icons-material";
import { Box, Grid, Modal } from "@mui/material";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";

export const BoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        marginTop: "3rem",
    },
}));

export const ContainerSpace = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
}));

export const Poster = styled("img")(({ theme }) => ({
    borderRadius: "15px",
    boxShadow: "0.5em 1em 1em rgb(64,64,70)",
    width: "100%",
    height: "fit-content",
    marginBottom: "30px",
    flexShrink: "0",
    [theme.breakpoints.down("md")]: {
        marginInline: "auto",
        width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
        // margin: "0 auto",
        width: "100%",
        // height: "350px",
        // marginBottom: "30px",
    },
}));

export const GenresContainer = styled(Grid)(({ theme }) => ({
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
}));

export const GenerImage = styled("img")(({ theme }) => ({
    filter: theme.palette.mode === "light" ? "dark" : "invert(1)",
    marginRight: "10px",
    height: "30px",
}));

export const Links = styled(Link)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
        padding: "0.5rem 1rem",
    },
}));

export const CastImage = styled("img")(() => ({
    width: `100%`,
    maxWidth: "7em",
    height: "8em",
    objectFit: "cover",
    borderRadius: "10px",
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignIntems: "center",
        justifyContent: "center",
    },
}));

export const StyledModal = styled(Modal)(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
export const Video = styled("iframe")(({ theme }) => ({
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
        width: "90%",
        height: "90%",
    },
}));
