import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InputContainer, SearchContainer } from "./style";
import { SearchMovie } from "../../features/currentGenreOrCateograry";

const Search = () => {
    const [query, setQuery] = useState("");
    const dispatch = useAppDispatch();
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") dispatch(SearchMovie(query)); 
    };
    return (
        <SearchContainer>
            <InputContainer
                onKeyUp={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="outlined"
                label="Search..."
                fullWidth
                sx={{ paddingTop: "0" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </SearchContainer>
    );
};

export default Search;
