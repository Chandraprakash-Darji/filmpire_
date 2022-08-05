import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css"; 
declare module "@mui/styles/defaultTheme" {
    interface DefaultTheme extends Theme {}
}

const theme = createTheme({});

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>
);
