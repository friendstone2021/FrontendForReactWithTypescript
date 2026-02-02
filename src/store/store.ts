import {combineSlices, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {all, fork} from "redux-saga/effects";
import {loginSaga} from "./auth/login/saga.ts";
import {registerSaga} from "./auth/register/saga.ts";
import {forgetpwdSaga} from "./auth/forgetpwd/saga.ts";
import {resetpwdSaga} from "./auth/resetpwd/saga.ts";
import {layoutSaga} from "./layout/saga.ts";
import loginSlice from "./auth/login/reducer.ts";
import registerSlice from "./auth/register/reducer.ts";
import forgetpwdSlice from "./auth/forgetpwd/reducer.ts";
import resetpwdSlice from "./auth/resetpwd/reducer.ts";
import layoutSlice from "./layout/reducer.ts";

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {

    const rootReducer = combineSlices(
        loginSlice,
        registerSlice,
        forgetpwdSlice,
        resetpwdSlice,
        layoutSlice
    );

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({thunk: false}).concat(sagaMiddleware);
        }
    });

    const rootSaga = function* () {
        yield all([
            fork(loginSaga),
            fork(registerSaga),
            fork(forgetpwdSaga),
            fork(resetpwdSaga),
            layoutSaga,
        ]);
    }

    sagaMiddleware.run(rootSaga);

    return store;
}

export const store = createStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export default createStore;
