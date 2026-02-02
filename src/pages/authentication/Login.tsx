import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import {
    Row,
    Col,
    CardBody,
    Card,
    // Alert,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
} from "reactstrap";
import {actions} from "../../store/auth/login/reducer.ts";
import {actions as registerAction} from "../../store/auth/register/reducer.ts";
import type {RootState} from "../../store/store.ts";
import type {ActionAuthPayload, UserInfo} from "../../store/auth/type.ts";

export const Login = () => {

    document.title = 'Login';

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            userId: "",
            enpswd: "",
            userNm: ""
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("Please Enter Your Email"),
            enpswd: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values: UserInfo) => {
            const payload: ActionAuthPayload = {
                user: values,
                history: '/login',
                error: null
            }
            dispatch(actions.actionLoginRequest(payload))
        }
    });

    const isLoggedIn = useSelector((state:RootState) => state.login.isLoggedIn);

    useEffect(() => {
        if(isLoggedIn){
            navigate("/filemanager");
        }
    })

    const isRegistered = useSelector((state:RootState) => state.register.isRegistered);

    const moveToRegister = () => {
        if(isRegistered){
            dispatch(registerAction.actionRegisteredCancel({error: null, history: "/login"}));
        }else{
            navigate("/register");
        }
    };

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary-subtle">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid"/>
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0">
                                    <div className="auth-logo">
                                        <Link to="/" className="auth-logo-light">
                                            <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                              src={lightlogo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                          />
                        </span>
                                            </div>
                                        </Link>
                                        <Link to="/" className="auth-logo-dark">
                                            <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                          />
                        </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-2">
                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            {/*{error.error ? <Alert color="danger">{error.error}</Alert> : null}*/}

                                            <div className="mb-3">
                                                <Label className="form-label">Email</Label>
                                                <Input
                                                    name="userId"
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    type="email"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.userId || ""}
                                                    invalid={
                                                        !!(validation.touched.userId && validation.errors.userId)
                                                    }
                                                />
                                                {validation.touched.userId && validation.errors.userId ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.userId}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Password</Label>
                                                <Input
                                                    name="enpswd"
                                                    autoComplete="off"
                                                    value={validation.values.enpswd || ""}
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    invalid={
                                                        !!(validation.touched.enpswd && validation.errors.enpswd)
                                                    }
                                                />
                                                {validation.touched.enpswd &&
                                                validation.errors.enpswd ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.enpswd}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="customControlInline"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="customControlInline"
                                                >
                                                    Remember me
                                                </label>
                                            </div>

                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block"
                                                    type="submit"
                                                >
                                                    Log In
                                                </button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <Link to="/forgot-password" className="text-muted">
                                                    <i className="mdi mdi-lock me-1"/>
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Don&#39;t have an account ?{" "}
                                    <Link to="/register" className="fw-medium text-primary" onClick={moveToRegister}>
                                        {" "}
                                        Signup now{" "}
                                    </Link>{" "}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}
