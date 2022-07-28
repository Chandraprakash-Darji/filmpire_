import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Actors, Movies, MovieInformation, Profile, NavBar } from "./";

import useStyles from "./styles";

const App = () => { 
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes>
                    <Route path="/movie/:id" element={<MovieInformation />} />
                    <Route path="/actors/:id" element={<Actors />} />
                    <Route path="/" element={<Movies />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
