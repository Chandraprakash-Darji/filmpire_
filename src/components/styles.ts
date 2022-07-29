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
