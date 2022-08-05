import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Actors, Movies, MovieInformation, Profile, NavBar } from "./";

import { Content, Root, ToolBar } from "./styles";

const App = () => {
    return (
        <Root>
            <NavBar />
            <Content>
                <ToolBar />
                <Routes>
                    <Route path="/" element={<Movies />} />
                    <Route path="/approved" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieInformation />} />
                    <Route path="/actors/:id" element={<Actors />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </Content>
        </Root>
    );
};

export default App;
