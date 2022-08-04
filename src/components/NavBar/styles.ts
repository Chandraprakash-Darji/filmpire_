import { Button, Drawer, IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/styles";

const drawerWidth = "240px";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    height: "80px",
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "240px",
    [theme.breakpoints.down("md")]: {
        marginLeft: "0",
        flexWrap: "wrap",
        height: "auto",
        paddingBlock: "10px",
        // rowGap: "25px",
    },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
        display: "none",
    },
}));

export const StyledDrawer = styled("nav")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
    },
}));

export const DrawerPaper = styled(Drawer)(() => ({
    width: drawerWidth,
}));

export const LinkButton = styled(Button)(() => ({
    "&:hover": {
        color: "white",
        textDecoration: "none",
    },
}));
