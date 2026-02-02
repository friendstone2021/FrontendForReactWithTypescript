import { useEffect } from "react";
import withRouter from "../../components/common/withRouter";
import {actions} from "../../store/auth/login/reducer.ts";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type {ActionAuthPayload} from "../../store/auth/type.ts";
import {Login} from "./Login.tsx";

const Logout = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const payload: ActionAuthPayload = {
                history: '/login',
                error: null
            }
    dispatch(actions.actionLogoutRequest(payload));
  }, [dispatch, history]);

  return <Login></Login>;
};


export default withRouter(Logout);
