import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type userObject = {
    avatar: string;
    gravatar: { hash: string };
    tmdb: { avatar_path: null | string };
    id: number;
    username: string;
    [key: string]: any;
};

type initialStateType = {
    user: null | userObject;
    isAuth: boolean;
    sessionId: null | string;
};

const initialState: initialStateType = {
    user: null,
    isAuth: false,
    sessionId: "",
};

export const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userObject>) => {
            state.user = action.payload;
            state.isAuth = true;
            state.sessionId = localStorage.getItem("session_id");
            localStorage.setItem("accountId", `${action.payload.id}`);
        },
    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
