import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import LoginImage from "../assets/login.jpg";

export default function Signin() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [userErr, setUserErr] = useState("");

  const onSubmit = (data) => {
    handleSignIn(data);
  };

  async function handleSignIn({ email, password }) {
    try {
      const user = await Auth.signIn(email, password);
      console.log("********Authentication successfull", user);
      localStorage.setItem(
        "IDToken",
        user?.signInUserSession?.idToken?.jwtToken
      );
      localStorage.setItem(
        "AccessToken",
        user?.signInUserSession?.accessToken?.jwtToken
      );
      localStorage.setItem(
        "RefreshToken",
        user?.signInUserSession?.refreshToken?.token
      );
      history.push("/dashboard");
    } catch (error) {
      setUserErr(error);
      console.log("error signing in", error);
    }
  }
  return (
    <div className="App">
      <div className="register-container">
        <div className="register-form">
          <div className="row">
            <div className="col-md-6 col-lg-6" data-aos="zoom-in">
              <img src={LoginImage} className="register-image" alt="register" />
            </div>
            <div className="col-md-6 col-lg-6 form-signup" data-aos="zoom-in">
              <button
                onClick={() => {
                  Auth.federatedSignIn({ provider: "Google" });
                }}
                className="oauth-container google-btn btn darken-4 white black-text"
              >
                <div className="left">
                  <img
                    width={20}
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                </div>
                Login with Google
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                    ref={register({
                      required: "Email is required*",
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                  />
                  {errors.email && errors.email.type === "pattern" && (
                    <p className="error-msg">Email Should be valid*</p>
                  )}
                  {errors.email && (
                    <p className="error-msg"> {errors.email.message}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password*</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="Password"
                    ref={register({
                      required: "password is required*",
                      minLength: 8,
                      maxLength: 20,
                    })}
                  />
                  {errors.password &&
                    (errors.password.type === "minLength" ||
                      errors.password.type === "maxLength") && (
                      <p className="error-msg">
                        {" "}
                        Password Should be minimum 8 digits and maximum 20*
                      </p>
                    )}
                  {errors.password && (
                    <p className="error-msg"> {errors.password.message}</p>
                  )}
                </div>
                <button type="submit" className="btn login-btn">
                  Login
                </button>
                {userErr && <p className="error-msg">{userErr.message}</p>}
                <p>
                  Create account? <Link to="/">Register</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
