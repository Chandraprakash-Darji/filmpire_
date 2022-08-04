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
import { useEffect, useState } from "react";
import { Sidebar, Search } from "..";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/auth";

const NavBar = () => {
    const { isAuth, user } = useAppSelector((state) => state.user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width:900px)");
    const token = localStorage.getItem("request_token");
    const sessionIdLS = localStorage.getItem("session_id");

    const dispatch = useAppDispatch();

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdLS) {
                    const { data: userData } = await moviesApi.get(
                        `/account?session_id=${sessionIdLS}`
                    );
                    dispatch(setUser(userData));
                } else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(
                        `/account?session_id=${sessionId}`
                    );
                    dispatch(setUser(userData));
                }
            }
        };
        logInUser();
    }, [token]);

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
                    {!isMobile && <Search />}
                    <div>
                        {!isAuth ? (
                            <LinkButton color="inherit" onClick={fetchToken}>
                                Login &nbsp; <AccountCircle />
                            </LinkButton>
                        ) : (
                            <Button
                                color="inherit"
                                component={Link}
                                to={`/profile/${user?.id}`}
                                onClick={() => {}}
                            >
                                My Movies &nbsp;
                                <Avatar
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        backgroundColor: "#123456",
                                    }}
                                    alt={user?.username}
                                    src={""}
                                >
                                    {user?.username[0]}
                                </Avatar>
                            </Button>
                        )}
                    </div>
                    {isMobile && <Search />}
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
                            <Sidebar/>
                        </DrawerPaper>
                    )}
                </StyledDrawer>
            </div>
        </>
    );
};

export default NavBar;
