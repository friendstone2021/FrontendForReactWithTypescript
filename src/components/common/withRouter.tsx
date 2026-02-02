import {useLocation, useNavigate, useParams} from "react-router-dom";
import type {ComponentType} from "react";

export default function withRouter<P>(Component:ComponentType<P>) {

    function ComponentWithRouterProp(props: P) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} router = {{location, navigate, params}} />
    }

    return ComponentWithRouterProp;
}
