import { call, put, takeEvery} from "redux-saga/effects";
import {post} from "../../../helpers/api_helper";
import * as url from "../../../helpers/url_helper";

import {actions} from "./reducer.ts";
import type {ActionAuthPayload, ActionAuthProps} from "../type.ts";

function* loginRequest(action: ActionAuthProps) {

    const payload:ActionAuthPayload = action.payload;
    try{
        const response:ActionAuthPayload = yield call(data => post<typeof payload.user, ActionAuthPayload>(url.POST_LOGIN_REQUEST, data),{
            userId: payload.user?.userId,
            enpswd: payload.user?.enpswd
        });

        if(response != null && Object.keys(response).length > 0 && response.user != null && Object.keys(response.user).length > 0){
            localStorage.setItem("authUser", JSON.stringify(response.user));
            yield put(actions.actionLoginSuccess(
                {
                    ...payload,
                    user: {
                        userId:response.user.userId,
                        enpswd:response.user.enpswd,
                        userNm:response.user.userNm
                    }
                }
            ));
        }else{
            yield put(actions.actionLoginFailure(
                {
                    ...payload,
                    error: "로그인에 실패하였습니다."
                }
            ))
        }

    }catch(error){
        // console.error(error);
        if(error instanceof Error){
            yield put(actions.actionLoginFailure(
                {
                    ...payload,
                    error: error.message
                }
            ))
        }
    }
}

function* loginSuccess(action: ActionAuthProps) {
    yield console.log("login success", action);
}

function* logoutRequest(action: ActionAuthProps) {

    const payload:ActionAuthPayload = action.payload;
    try{
        localStorage.removeItem("authUser");
        yield call(data => post(url.POST_LOGOUT_REQUEST, data),{
            userId: payload.user?.userId
        });
        yield put(actions.actionLogoutSuccess(payload))
    }catch(error){
        if(error instanceof Error){
            yield put(actions.actionLogoutFailure(
                {
                    ...payload,
                    error: error.message
                }
            ));
        }
    }

}

export function* loginSaga(){
    yield takeEvery(actions.actionLoginRequest, loginRequest);
    yield takeEvery(actions.actionLoginSuccess, loginSuccess);
    yield takeEvery(actions.actionLogoutRequest, logoutRequest);
}
