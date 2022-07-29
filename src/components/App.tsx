import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Actors, Movies, MovieInformation, Profile, NavBar } from "./";

import { Content, Root, ToolBar } from "./styles";

const App = () => {
    return (
        <Root>
            <CssBaseline />
            <NavBar />
            <Content>
                <ToolBar />
                <Routes>
                    <Route path="/movie/:id" element={<MovieInformation />} />
                    <Route path="/actors/:id" element={<Actors />} />
                    <Route path="/" element={<Movies />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Content>
        </Root>
    );
};

export default App;
