import { styled } from "@mui/styles";
import { Link } from "react-router-dom";

export const ImageLink = styled(Link)(() => ({
    display: "flex",
    justifyContent: "center",
    padding: "10% 0",
}));

export const Image = styled("img")(({ theme }) => ({
    width: "70%",
    filter:
        theme.palette.mode === "light"
            ? "hue-rotate(75deg)"
            : "hue-rotate(129deg) brightness(10)",
}));

export const Links = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: "none",
}));

export const GenerImage = styled("img")(({ theme }) => ({
    filter: theme.palette.mode === "light" ? "dark" : "invert(1)",
}));
