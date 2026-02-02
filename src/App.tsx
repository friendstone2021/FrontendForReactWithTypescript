import React, {type ReactElement} from 'react';
import { Routes, Route } from "react-router-dom";
import {AuthCheck} from "./pages/AuthCheck.tsx";
import {Login} from "./pages/authentication/Login.tsx";
import {Register} from "./pages/authentication/Register.tsx";
import "./assets/scss/theme.scss";
import {ForgetPwd} from "./pages/authentication/ForgetPwd.tsx";
import {ResetPwd} from "./pages/authentication/ResetPwd.tsx";
import VerticalLayout from "./components/VerticalLayout/";
import Filemanager from "./pages/filemanager";
import Logout from "./pages/authentication/Logout.tsx";

function App() {

    const authProtectedRoutes : {path:string, component:ReactElement}[] = [
        {path:"/", component:<Filemanager></Filemanager>},
        {path:"/filemanager", component:<Filemanager></Filemanager>},
    ];
    const publicRoutes : {path:string, component:ReactElement}[] = [
        {path:"/login", component:<Login></Login>},
        {path:"/logout", component:<Logout></Logout>},
        {path:"/forgot-password", component:<ForgetPwd></ForgetPwd>},
        {path:"/reset-password", component:<ResetPwd></ResetPwd>},
        {path:"/register", component:<Register></Register>},
    ];

    return (
        <React.Fragment>
            <Routes>
                {authProtectedRoutes.map((routeProp, idx) => (
                    <Route
                        path={routeProp.path}
                        element={<AuthCheck location={routeProp.path}><VerticalLayout>{routeProp.component}</VerticalLayout></AuthCheck>}
                        key={idx}
                    />
                ))}
                {publicRoutes.map((routeProp, idx) => (
                    <Route
                        path={routeProp.path}
                        element={routeProp.component}
                        key={idx}
                    />
                ))}
            </Routes>
        </React.Fragment>
    )
}

export default App
