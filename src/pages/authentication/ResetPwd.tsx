import React, {useEffect} from "react";
import {
    Row,
    Col,
    // Alert,
    Card,
    CardBody,
    Container,
    FormFeedback,
    Input,
    Label,
    Form,
} from "reactstrap";

//redux
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import {useFormik} from "formik";

// action

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";
import type {ActionAuthPayload, UserInfo} from "../../store/auth/type.ts";
import {actions} from "../../store/auth/resetpwd/reducer.ts";
import type {RootState} from "../../store/store.ts";

export const ResetPwd = () => {
    //meta title
    document.title = "Reset Password";

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            userId: '',
            userNm: '',
            enpswd: '',
            resetPwdToken: null
        },
        validationSchema: Yup.object({
            enpswd: Yup.string().required("Please Enter new password"),
        }),
        onSubmit: (values: UserInfo) => {
            values.resetPwdToken = token;
            const payload: ActionAuthPayload = {
                user: values,
                history: "/forgot-password",
                error: null
            }
            dispatch(actions.actionResetpwdRequest(payload));
        },
    });

    const isResetpwd = useSelector((state: RootState) => state.resetpwd.isResetpwd);

    useEffect(() => {
        if (isResetpwd) {
            navigate("/login");
        }
    })

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2"/>
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden">
                                <div className="bg-primary-subtlebg-soft-primary">
                                    <Row>
                                        <Col xs={7}>
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary">Welcome Back !</h5>
                                                <p>Sign in to continue to Skote.</p>
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
                                        {/*{resetError && resetError ? (*/}
                                        {/*    <Alert color="danger" style={{marginTop: "13px"}}>*/}
                                        {/*        {resetError}*/}
                                        {/*    </Alert>*/}
                                        {/*) : null}*/}
                                        {/*{resetSuccessMsg ? (*/}
                                        {/*    <Alert color="success" style={{marginTop: "13px"}}>*/}
                                        {/*        {resetSuccessMsg}*/}
                                        {/*    </Alert>*/}
                                        {/*) : null}*/}

                                        <Form
                                            className="form-horizontal"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                validation.handleSubmit();
                                                return false;
                                            }}
                                        >
                                            <div className="mb-3">
                                                <Label className="form-label">New Password</Label>
                                                <Input
                                                    name="enpswd"
                                                    className="form-control"
                                                    placeholder="Enter new password"
                                                    type="password"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.enpswd || ""}
                                                    invalid={
                                                        !!(validation.touched.enpswd && validation.errors.enpswd)
                                                    }
                                                />
                                                {validation.touched.enpswd && validation.errors.enpswd ? (
                                                    <FormFeedback type="invalid">
                                                        {validation.errors.enpswd}
                                                    </FormFeedback>
                                                ) : null}
                                            </div>
                                            <Row className="mb-3">
                                                <Col className="text-end">
                                                    <button
                                                        className="btn btn-primary w-md "
                                                        type="submit"
                                                    >
                                                        Reset
                                                    </button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                            <div className="mt-5 text-center">
                                <p>
                                    Go back to{" "}
                                    <Link to="login" className="font-weight-medium text-primary">
                                        Login
                                    </Link>{" "}
                                </p>
                                <p>
                                    © {new Date().getFullYear()} Skote. Crafted with{" "}
                                    <i className="mdi mdi-heart text-danger"/> by Themesbrand
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

