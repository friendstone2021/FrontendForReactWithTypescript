import React, {useEffect} from "react";
import {
    Row,
    Col,
    CardBody,
    Card,
    // Alert,
    Container,
    Input,
    Label,
    Form,
    FormFeedback
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

// action
import {actions} from "../../store/auth/register/reducer.ts";
import type {RootState} from "../../store/store.ts";

//redux
import {useSelector, useDispatch} from "react-redux";

import {Link, useNavigate} from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import type {ActionAuthPayload, UserInfo} from "../../store/auth/type.ts";

export const Register = () => {
    document.title = "Register";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            userId: '',
            userNm: '',
            enpswd: '',
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("Please Enter Your Email"),
            userNm: Yup.string().required("Please Enter Your Username"),
            enpswd: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values: UserInfo) => {
            const payload: ActionAuthPayload = {
                user: values,
                history: "/register",
                error: null
            };
            dispatch(actions.actionRegisterRequest(payload));
        }
    });

    const isRegistered = useSelector((state:RootState) => state.register.isRegistered);

    useEffect(() => {
        if (isRegistered) {
            navigate("/login");
        }
    })

    return (
        <React.Fragment>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary-subtle">
                                    <Row>
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Free Register</h5>
                                                <p>Get your free Skote account now.</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profileImg} alt="" className="img-fluid"/>
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
                                            {/*{user && user ? (*/}
                                            {/*    <Alert color="success">*/}
                                            {/*        Register User Successfully*/}
                                            {/*    </Alert>*/}
                                            {/*) : null}*/}

                                            {/*{registrationError && registrationError ? (*/}
                                            {/*    <Alert color="danger">{registrationError}</Alert>*/}
                                            {/*) : null}*/}

                                            <div className="mb-3">
                                                <Label className="form-label">Email</Label>
                                                <Input
                                                    id="userId"
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
                                                    <FormFeedback
                                                        type="invalid">{validation.errors.userId}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mb-3">
                                                <Label className="form-label">Username</Label>
                                                <Input
                                                    name="userNm"
                                                    type="text"
                                                    placeholder="Enter username"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.userNm || ""}
                                                    invalid={
                                                        !!(validation.touched.userNm && validation.errors.userNm)
                                                    }
                                                />
                                                {validation.touched.userNm && validation.errors.userNm ? (
                                                    <FormFeedback
                                                        type="invalid">{validation.errors.userNm}</FormFeedback>
                                                ) : null}
                                            </div>
                                            <div className="mb-3">
                                                <Label className="form-label">Password</Label>
                                                <Input
                                                    name="enpswd"
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.enpswd || ""}
                                                    invalid={
                                                        !!(validation.touched.enpswd && validation.errors.enpswd)
                                                    }
                                                />
                                                {validation.touched.enpswd && validation.errors.enpswd ? (
                                                    <FormFeedback
                                                        type="invalid">{validation.errors.enpswd}</FormFeedback>
                                                ) : null}
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    className="btn btn-primary btn-block "
                                                    type="submit"
                                                >
                                                    Register
                                                </button>
                                            </div>

                                            <div className="mt-4 text-center">
                                                <p className="mb-0">
                                                    By registering you agree to this site{" "}
                                                    <Link to="#" className="text-primary">
                                                        Terms of Use
                                                    </Link>
                                                </p>
                                            </div>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Already have an account ?{" "}
                                    <Link to="/login" className="font-weight-medium text-primary">
                                        {" "}
                                        Login
                                    </Link>{" "}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};
