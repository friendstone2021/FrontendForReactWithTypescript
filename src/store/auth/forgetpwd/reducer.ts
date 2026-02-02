import {createSlice} from "@reduxjs/toolkit";
import type {ActionAuthProps, AuthState} from "../type.ts";

const initialState: AuthState = {
    isLoggedIn: false,
    isRegistered: false,
    isSendMail: false,
    error: null,
    loading: false,
}

const forgetpwdSlice = createSlice({
    name: "forgetpwd",
    initialState,
    reducers: {
        actionSendResetPwdMailRequest: (state:AuthState, action: ActionAuthProps) => {
            return {...state, loading: true};
        },
        actionSendResetPwdMailSuccess: (state:AuthState, action: ActionAuthProps) => {
            return {...state, isSendMail:true, loading: false};
        },
        actionSendResetPwdMailFailure: (state:AuthState, action: ActionAuthProps) => {
            return {...state, isSendMail:false, error:action.payload.error, loading: false};
        }
    }
})

export const actions = forgetpwdSlice.actions;
export default forgetpwdSlice;
