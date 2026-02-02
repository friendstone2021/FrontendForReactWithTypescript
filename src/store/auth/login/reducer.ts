import {createSlice} from "@reduxjs/toolkit";
import type {ActionAuthProps, AuthState} from "../type.ts";

const initialState: AuthState = {
    isLoggedIn: false,
    isRegistered: false,
    error: null,
    loading: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        actionLoginRequest: (state:AuthState, action:ActionAuthProps) => {
            return {...state, loading: true};
        },
        actionLoginSuccess: (state:AuthState, action:ActionAuthProps) => {
            return {...state, isLoggedIn: true, loading: false};
        },
        actionLoginFailure: (state:AuthState, action:ActionAuthProps) => {
            return {...state, isLoggedIn: false, error:action.payload.error, loading: false};
        },
        actionLogoutRequest: (state:AuthState, action:ActionAuthProps) => {
            return {...state, loading: true};
        },
        actionLogoutSuccess: (state:AuthState, action:ActionAuthProps) => {
            return {...state, isLoggedIn: false ,loading: false};
        },
        actionLogoutFailure: (state:AuthState, action:ActionAuthProps) => {
            return {...state, error:action.payload.error, loading: false};
        }
    }
});

export const actions = loginSlice.actions;
export default loginSlice;
