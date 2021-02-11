import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

const ConfirmCode = (props) => {
  const [verifyError, setVerifyError] = useState("");

  console.log(props);
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    handleVerifyCode(props?.location?.state?.userName, data?.verifycode);
  };

  async function handleVerifyCode(userName, code) {
    try {
      const verifyCode = await Auth.confirmSignUp(userName, code, {
        forceAliasCreation: true,
      });
      console.log("verifyCode*****", verifyCode);
      history.push("/");
    } catch (error) {
      setVerifyError(error);
      console.log("error confirming sign up", error);
    }
  }

  return (
    <div className="App">
      <div className="register-container">
        <div className="register-form">
          <div className="col-md-8 col-lg-8 form-signup" data-aos="zoom-in">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="verify-code-form"
            >
              <div className="form-group">
                <label htmlFor="verifycode">VerifyCode*</label>
                <input
                  type="text"
                  className="form-control"
                  id="verifycode"
                  name="verifycode"
                  placeholder="Enter Verification Code"
                  ref={register({
                    required: "verifyCode is required*",
                    minLength: 6,
                    maxLength: 6,
                  })}
                />
                {errors.verifycode &&
                  errors.verifycode.type === "minLength" &&
                  errors.verifycode.type === "maxLength" && (
                    <p className="error-msg">verifycode Should be valid*</p>
                  )}
                {errors.verifycode && (
                  <p className="error-msg"> {errors.verifycode.message}</p>
                )}
                {verifyError && (
                  <p className="error-msg"> {verifyError.message}</p>
                )}
              </div>
              <button type="submit" className="btn verify-btn">
                Verify Code
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmCode;
