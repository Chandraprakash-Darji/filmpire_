import { TextField } from "@mui/material";
import { styled } from "@mui/styles";

export const SearchContainer = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
    },
}));

export const InputContainer = styled(TextField)(({ theme }) => ({
    color: theme.palette.mode === "light" ? "black" : "",
    filter: theme.palette.mode === "light" ? "invert(1)" : "",
    [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "center",
        width: "30rem",
        marginTop: "-10px",
        marginBottom: "10px",
    },
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));
