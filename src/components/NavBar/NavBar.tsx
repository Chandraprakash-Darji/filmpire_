import {
    AppBar,
    Avatar,
    useMediaQuery,
    IconButton,
    Button,
} from "@mui/material";
import {
    Menu,
    AccountCircle,
    Brightness4,
    Brightness7,
} from "@mui/icons-material";

import { useTheme } from "@mui/styles";
import {
    DrawerPaper,
    LinkButton,
    MenuButton,
    StyledDrawer,
    StyledToolbar,
} from "./styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "..";

const NavBar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:800px)");
    const isAuthenticated = false;
    return (
        <>
            <AppBar position="fixed">
                <StyledToolbar>
                    {isMobile && (
                        <MenuButton
                            color="inherit"
                            edge="start"
                            style={{ outline: "none" }}
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu />
                        </MenuButton>
                    )}
                    <IconButton
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={() => {}}
                    >
                        {theme.palette.mode === "dark" ? (
                            <Brightness7 />
                        ) : (
                            <Brightness4 />
                        )}
                    </IconButton>
                    {!isMobile && "Search ..."}
                    <div>
                        {!isAuthenticated ? (
                            <LinkButton color="inherit" onClick={() => {}}>
                                Login &nbsp; <AccountCircle />
                            </LinkButton>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to={`/profile/:id`}
                                onClick={() => {}}
                            >
                                {isMobile && <>My Movies &nbsp;</>}
                                <Avatar
                                    style={{ width: "30px", height: "30px" }}
                                    alt="Rega op"
                                    src={""}
                                >
                                    RO
                                </Avatar>
                            </Button>
                        )}
                    </div>
                    {isMobile && "Search ..."}
                </StyledToolbar>
            </AppBar>
            <div>
                <StyledDrawer>
                    {isMobile ? (
                        <DrawerPaper
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            ModalProps={{ keepMounted: true }}
                            onClose={() => setMobileOpen(false)}
                        >
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </DrawerPaper>
                    ) : (
                        <DrawerPaper variant="permanent">
                            <Sidebar setMobileOpen={setMobileOpen} />
                        </DrawerPaper>
                    )}
                </StyledDrawer>
            </div>
        </>
    );
};

export default NavBar;
