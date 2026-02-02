export type UserInfo = {
    userId: string;
    enpswd: string;
    userNm: string;
    resetPwdToken?: string | null | undefined;
}

export type ActionAuthPayload = {
    user?: UserInfo;
    history: string;
    error: string | null | undefined;
}

export type ActionAuthProps = {
    type: string;
    payload: ActionAuthPayload;
}

export type AuthState = {
    isLoggedIn: boolean;
    isRegistered?: boolean;
    isSendMail?: boolean;
    isResetpwd?: boolean;
    error: string | null | undefined;
    loading: boolean;
}
