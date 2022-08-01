import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";

import genreOrCateogoryReducer from "../features/currentGenreOrCateograry";

const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCateogory: genreOrCateogoryReducer,
    },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
