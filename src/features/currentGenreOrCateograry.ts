import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type IntialStateType = {
    genreIdOrCateogaryName: "popular" | "top_rated" | "upcoming" | number;
    page: number;
    searchQuery: string;
};

const initialState: IntialStateType = {
    genreIdOrCateogaryName: "popular",
    page: 1,
    searchQuery: "",
};
export const genreOrCateogory = createSlice({
    name: "genreOrCateogory",
    initialState,
    reducers: {
        selectGenreOrCateogary: (
            state,
            action: PayloadAction<"popular" | "top_rated" | "upcoming" | number>
        ) => {
            state.genreIdOrCateogaryName = action.payload;
            state.searchQuery = "";
        },
        SearchMovie: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
    },
});

export const { selectGenreOrCateogary, SearchMovie } = genreOrCateogory.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectGenreOrCateogary = (state: RootState) =>
// state.currentGenreOrCateogory.genreIdOrCateogaryName;

export default genreOrCateogory.reducer;
