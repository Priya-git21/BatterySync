import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import "./authentication.css";
import { FaEnvelope, FaKey, FaGoogle, FaApple } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import InputField from "../ui/InputField";
import {
    login_initialValues,
    login_validationSchema,
} from "../../lib/server_actions/utils";
import {
    handleGoogleLogin,
    handleAppleLogin,
    login_onSubmit,
    togglePasswordVisibility,
} from "../../lib/client_actions/user.actions";
import PageTransitionWrapper from "../../PageTransitionWrapper";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [socialLoginDisabled, setSocialLoginDisabled] = useState(false);
    console.log(isSubmitting);

    const handleSocialLogin = async (platform, setSubmitting) => {
        setSocialLoginDisabled(true);
        setIsSubmitting(true);

        try {
            if (platform === "google") {
                await handleGoogleLogin(setSubmitting, navigate);
            } else if (platform === "apple") {
                await handleAppleLogin(setSubmitting, navigate); // Implement Apple login logic
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || "An error occurred. Please try again.");
        } finally {
            setSocialLoginDisabled(false);
            setIsSubmitting(false);
        }
    };

    return (
        <PageTransitionWrapper>
            <div className="auth-right">
                <div className="glass-form">
                    <h2>
                        <IoIosLogIn className="login-icon" /> Login Now
                    </h2>

                    <Formik
                        initialValues={login_initialValues}
                        validationSchema={login_validationSchema}
                        onSubmit={async (values, actions) => {
                            setIsSubmitting(true);
                            await login_onSubmit(values, actions, navigate);
                            setIsSubmitting(false);
                        }}
                    >
                        {({ isSubmitting, isValid, dirty, setSubmitting }) => (
                            <Form>
                                {/* Social login buttons */}
                                <div className="social-buttons">
                                    <button
                                        className="social-button google-button"
                                        onClick={() => handleSocialLogin("google", setSubmitting)}
                                        disabled={isSubmitting || socialLoginDisabled}
                                    >
                                        <FaGoogle /> <span>Google</span>
                                    </button>
                                    <button
                                        className="social-button apple-button"
                                        onClick={() => handleSocialLogin("apple", setSubmitting)}
                                        disabled={isSubmitting || socialLoginDisabled}
                                    >
                                        <FaApple /> <span>Apple</span>
                                    </button>
                                </div>

                                {/* Division */}
                                <div className="or-line">
                                    <span>or</span>
                                </div>

                                {/* Form Fields */}
                                {/* Email */}
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    icon={<FaEnvelope />}
                                />

                                {/* Password */}
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    icon={<FaKey />}
                                    passwordVisible={passwordVisible}
                                    togglePasswordVisibility={() =>
                                        togglePasswordVisibility(setPasswordVisible)
                                    }
                                />

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={
                                        isSubmitting || !isValid || !dirty || socialLoginDisabled
                                    }
                                >
                                    {isSubmitting ? "Logging In..." : "Login"}{" "}
                                    <MdOutlineArrowForwardIos />
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <p className="signup-link">
                        Forgot Password? <Link to="/forgetPass">Click Here.</Link>
                    </p>
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup">Register</Link>
                    </p>
                </div>
            </div>
        </PageTransitionWrapper>
    );
};

export default Login;
