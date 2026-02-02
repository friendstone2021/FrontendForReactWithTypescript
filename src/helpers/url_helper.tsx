//REGISTER
export const POST_REGISTER_REQUEST = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/public/insertUserJoin.do";

//LOGIN
export const POST_LOGIN_REQUEST = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/actionLogin.do";

//LOGOUT
export const POST_LOGOUT_REQUEST = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/actionLogout.do";

//PROFILE
export const POST_DEV_PROFILE = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/user/getUserInfo.do";

//FORGETPSWD
export const POST_FORGETPWD_REQUEST = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/public/sendPswdResetEmail.do";

//RESETPSWD
export const POST_RESETPWD_REQUEST = import.meta.env.VITE_APP_BACKEND_CONTEXT+"/public/resetPassword.do";
