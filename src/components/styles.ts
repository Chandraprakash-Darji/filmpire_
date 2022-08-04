import { Box, Grid } from "@mui/material";
import { styled } from "@mui/styles";

export const Root = styled("div")(() => ({
    display: "flex",
    height: "100%",
}));
export const ToolBar = styled("div")(() => ({
    height: "70px",
}));
export const Content = styled("main")(() => ({
    flexGrow: "1",
    padding: "2em",
}));
// Wrapping the Movie and Actor Component To Make Proper spacing between NavBar and Content
export const BoxWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems:'center',
    flexDirection:'column',
    [theme.breakpoints.down("md")]: {
        marginTop: "3rem",
    },
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