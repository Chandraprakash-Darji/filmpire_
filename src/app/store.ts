import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";

import genreOrCateogoryReducer from "../features/currentGenreOrCateograry";

import authReducer from "../features/auth";

const store = configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCateogory: genreOrCateogoryReducer,
        user: authReducer,
    },
});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
