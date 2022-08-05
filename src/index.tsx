import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import "./index.css";
import ToggleColorMode from "./utils/ToggleColorMode";


createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ToggleColorMode>
            <Router>
                <App />
            </Router>
        </ToggleColorMode>
    </Provider>
);
