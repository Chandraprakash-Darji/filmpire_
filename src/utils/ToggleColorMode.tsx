import { createTheme, CssBaseline, Theme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { createContext, ReactElement, useMemo, useState } from "react";

declare module "@mui/styles/defaultTheme" {
    interface DefaultTheme extends Theme {}
}

interface ColorModeContextProps {
    mode: "light" | "dark";
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextProps>({
    mode: "dark",
    toggleColorMode: () => {},
});

const ToggleColorMode = ({ children }: { children: ReactElement }) => {
    const [mode, setMode] = useState<"light" | "dark">("light");

    const toggleColorMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    return (
        <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ToggleColorMode;
