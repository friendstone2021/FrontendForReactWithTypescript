import {call, put, takeEvery} from "redux-saga/effects";
import {post} from "../../../helpers/api_helper.tsx";
import * as url from "../../../helpers/url_helper";

import {actions} from "./reducer.ts";
import type {ActionAuthPayload, ActionAuthProps} from "../type.ts";

function* registerRequest(action:ActionAuthProps) {

    const payload:ActionAuthPayload = action.payload;
    try{
        const response:ActionAuthPayload = yield call(data => post<typeof payload.user, ActionAuthPayload>(url.POST_REGISTER_REQUEST,data), {
            userId: payload.user?.userId,
            enpswd: payload.user?.enpswd,
            userNm: payload.user?.userNm
        });

        if(response != null && Object.keys(response).length > 0 && response.user != null && Object.keys(response.user).length > 0) {
            localStorage.setItem("authUser", JSON.stringify(response.user));
            yield put(actions.actionRegisterSuccess({
                ...payload,
                user: {
                    userId:response.user.userId,
                    enpswd:response.user.enpswd,
                    userNm:response.user.userNm
                }
            }));
        }else{
            yield put(actions.actionRegisterFailure(
                {
                    ...payload,
                    error: "회원가입에 실패하였습니다."
                }
            ));
        }

    }catch(error){
        if(error instanceof Error){
            yield put(actions.actionRegisterFailure({
                ...payload,
                error: error.message
            }))
        }
    }
}

export function* registerSaga(){
    yield takeEvery(actions.actionRegisterRequest, registerRequest);
}
