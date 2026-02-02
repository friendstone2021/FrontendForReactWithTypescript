import {createSlice} from "@reduxjs/toolkit";
import type {ActionAuthProps, AuthState} from "../type.ts";

const initialState: AuthState = {
    isLoggedIn: false,
    isRegistered: false,
    error: null,
    loading: false,
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        actionRegisterRequest: (state: AuthState, action:ActionAuthProps) => {
            return {...state, loading: true};
        },
        actionRegisterSuccess: (state: AuthState, action:ActionAuthProps) => {
            return {...state, isRegistered: true, loading: false};
        },
        actionRegisterFailure: (state: AuthState, action:ActionAuthProps) => {
            return {...state, isRegistered: false, error:action.payload.error, loading: false};
        },
        actionRegisteredCancel: (state: AuthState, action:ActionAuthProps) => {
            return {...state, isRegistered: false, loading: false};
        }
    }
});

export const actions = registerSlice.actions;
export default registerSlice;
