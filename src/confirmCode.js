import React from 'react';
import { useForm } from "react-hook-form";
import { Auth } from 'aws-amplify';
import {Link, useHistory} from 'react-router-dom';

async function handleVerifyCode(userName, code) {
    try {
     const verifyCode = await Auth.confirmSignUp(userName, code, {forceAliasCreation: true});
     console.log("verifyCode*****", verifyCode);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

const ConfirmCode = (props) => {
  
  console.log(props)
  const history = useHistory();

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
       handleVerifyCode(props?.location?.state?.userName, data?.code);
       history.push('/signin');
    };
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="code" placeholder = "Enter Verification Code" ref={register({ required: true })} />
          {errors.code && <span>Code is required</span>}
          <input type="submit" value = "Verify Code"/>
      </form>
      </div>
    );
}
export default ConfirmCode;