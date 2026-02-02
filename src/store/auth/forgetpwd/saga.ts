import { call, put, takeEvery} from "redux-saga/effects";
import {post} from "../../../helpers/api_helper";
import * as url from "../../../helpers/url_helper";

import {actions} from "./reducer.ts"
import type {ActionAuthPayload, ActionAuthProps} from "../type.ts";

function* sendMailRequest(action: ActionAuthProps) {

    const payload:ActionAuthPayload = action.payload;
    try{
        const response:ActionAuthPayload = yield call(data => post<typeof payload.user,ActionAuthPayload>(url.POST_FORGETPWD_REQUEST, data),{
            userId: payload.user?.userId
        });

        if(response != null && Object.keys(response).length > 0 && response.user != null && Object.keys(response.user).length > 0){
            localStorage.setItem("authUser", JSON.stringify(response.user));
            yield put(actions.actionSendResetPwdMailSuccess(
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
            yield put(actions.actionSendResetPwdMailFailure(
                {
                    ...payload,
                    error: "메일발송에 실패하였습니다."
                }
            ))
        }

    }catch(error){
        if(error instanceof Error){
            yield put(actions.actionSendResetPwdMailFailure({
                ...payload,
                error:error.message
            }));
        }
    }

}

export function* forgetpwdSaga(){
    yield takeEvery(actions.actionSendResetPwdMailRequest, sendMailRequest);
}
