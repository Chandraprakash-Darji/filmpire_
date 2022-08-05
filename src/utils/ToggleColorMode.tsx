import { useState, useMemo, createContext, ReactElement } from "react";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/system";

declare module "@mui/styles" {
    interface DefaultTheme extends Theme {}
}

export const ColorModeContext = createContext<{
    mode: "light" | "dark";
    toggleColorMode: () => void;
}>({ mode: "dark", toggleColorMode: () => {} });

const ToggleColorMode = ({ children }: { children: ReactElement }) => {
    const preferTheme = useMediaQuery("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    const storageTheme = localStorage.getItem("colorMode");
    const defaultMode =
        storageTheme === "dark" || storageTheme === "light"
            ? storageTheme
            : preferTheme;

    const [mode, setMode] = useState<"light" | "dark">(defaultMode);

    const toggleColorMode = () => {
        setMode((prevMode) => {
            const m = prevMode === "light" ? "dark" : "light";
            localStorage.setItem("colorMode", m);
            return m;
        });
    };
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "dark"
                        ? {
                              primary: {
                                  main: "#00ff00",
                              },
                              divider: "#00ff0040",
                          }
                        : {}),
                    ...(mode === "light"
                        ? {
                              primary: {
                                  main: "#9c27b0",
                              },
                              divider: "#9c27b040",
                          }
                        : {}),
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <CssBaseline />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ToggleColorMode;
