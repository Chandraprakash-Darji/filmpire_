import { Grid, Modal } from "@mui/material";
import { styled } from "@mui/styles";
import { Link } from "react-router-dom";


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
