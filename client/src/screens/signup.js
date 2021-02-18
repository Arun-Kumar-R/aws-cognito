import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import RegisterImage from "../assets/register.jpg";

// Signup Method
/* async function signUp({name, email, password}) {
  try {
      const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
              name,
              email
          }
      });
      history.push({pathname: '/verify-code', state: { userName: user?.username }});
      console.log("*****User successfully Registerd..", user);
  } catch (error) {
      console.log('error signing up:', error);
  }
} */

const Signup = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useState(null);

  console.log("user state values", user);
  const onSubmit = async (data) => {
    setUser(data);
    await signUp(data);
  };

  async function signUp({ name, email, password }) {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name,
          email,
        },
      });
      history.push({
        pathname: "/verify-code",
        state: { userName: user?.username },
      });
      console.log("*****User successfully Registerd..", user);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }

  return (
    <div className="App">
      <div className="register-container">
        <div className="register-form">
          <div className="row">
            <div className="col-md-6 col-lg-6" data-aos="zoom-in">
              <img
                src={RegisterImage}
                className="register-image"
                alt="register"
              />
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
                SignUp with Google
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="name">Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    ref={register({
                      pattern: /^[a-zA-Z ]+$/,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.name && errors.name.type === "minLength" && (
                    <p className="error-msg">
                      {" "}
                      Name should be minimum 3 characters
                    </p>
                  )}
                  {errors.name && errors.name.type === "pattern" && (
                    <p className="error-msg">Name Should be an Alphabet*</p>
                  )}
                </div>
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
                    ref={register({ minLength: 8, maxLength: 20 })}
                  />
                  {errors.password &&
                    (errors.password.type === "minLength" ||
                      errors.password.type === "maxLength") && (
                      <p className="error-msg">
                        {" "}
                        Password Should be minimum 8 digits and maximum 20*
                      </p>
                    )}
                </div>
                <button type="submit" className="btn login-btn">
                  SignUp
                </button>
                <p>
                  Already have an account? <Link to="/signin">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
