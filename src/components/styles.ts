import { Box, Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const Root = styled("div")(({ theme }) => ({
    display: "flex",
    height: "100%",
    minHeight:'100vh',
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
}));
export const ToolBar = styled("div")(() => ({
    height: "70px",
}));
export const Content = styled("main")(({ theme }) => ({
    flexGrow: "1",
    padding: "2em",
    width: "100%",
}));
// Wrapping the Movie and Actor Component To Make Proper spacing between NavBar and Content
export const BoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: theme.palette.text.primary,
    height: "100%",
}));
// Wrapping the Movie and Actor Component
export const ContainerSpace = styled(Grid)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
}));
// Poster to display Movie Poster and Actor Image
export const Poster = styled("img")(({ theme }) => ({
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64,64,70)",
    width: "100%",
    height: "fit-content",
    marginBottom: "30px",
    flexShrink: "0",

    [theme.breakpoints.down("md")]: {
        marginInline: "auto",
        width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
        width: "80%",
    },
}));
