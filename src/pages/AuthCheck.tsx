import React from "react";
import type {ReactNode} from "react";
import {Navigate} from "react-router-dom";

export const AuthCheck = (props:{location:string, children:ReactNode}) => {
    console.log(localStorage.getItem("authUser"))
    if(!localStorage.getItem("authUser")){
        return (
            <Navigate to="/login" state={{from:props.location}}/>
        );
    }
    return <React.Fragment>{props.children}</React.Fragment>;
}
