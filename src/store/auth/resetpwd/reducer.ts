import {createSlice} from "@reduxjs/toolkit";
import type {ActionAuthProps, AuthState} from "../type.ts";

const initialState: AuthState = {
    isLoggedIn: false,
    isRegistered: false,
    isResetpwd: false,
    error: null,
    loading: false,
}

const resetpwdSlice = createSlice({
    name: "resetpwd",
    initialState,
    reducers: {
        actionResetpwdRequest: (state:AuthState, action: ActionAuthProps) => {
            return {...state, loading: true};
        },
        actionResetpwdSuccess: (state:AuthState, action: ActionAuthProps) => {
            return {...state, isResetpwd: true, loading: false};
        },
        actionResetpwdFailure: (state:AuthState, action: ActionAuthProps) => {
            return {...state, isResetpwd: false, error:action.payload.error, loading: false};
        }
    }
})

export const actions = resetpwdSlice.actions;
export default resetpwdSlice;
