import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Amplify, { Auth } from 'aws-amplify';
import {Link, useHistory} from 'react-router-dom';

// Amplify configured
Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-2:890369dc-0696-48a9-8c77-b097502df181',
        region: 'us-east-2',
        identityPoolRegion: 'us-east-2',
        userPoolId: 'us-east-2_wSwfNHiZC',
        userPoolWebClientId: '2flvubsspmfn5n1juv0adb83nq',
        oauth: {
          domain: 'authdemoz.auth.us-east-2.amazoncognito.com',
          redirectSignIn: 'http://localhost:3000/',
          redirectSignOut: 'http://localhost:3000/',
          responseType: 'token' // or 'token', note that REFRESH token will only be generated when the responseType is code
      }
    }
  });
  

  async function handleSignIn({email, password}) {
    try {
        const user = await Auth.signIn(email, password);
        console.log("********Authentication successfull", user);
    } catch (error) {
        console.log('error signing in', error);
    }
}


export default function Signin() {
    const history = useHistory();

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        handleSignIn(data);
        history.push('/welcome-page')
    };
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="email" placeholder = "*Enter your Email" ref={register({ required: true })} />
          {errors.email && <span>Email is required</span>}
          <input name="password" placeholder = "Enter your Password" ref={register({ required: true })}/>
          {errors.password && <span>Password is required</span>}
          <input type="submit" value = "SignIn"/>
          <p>Create new account?<Link to = "/">SignUp</Link></p>
      </form>

      <button onClick = {() => {
            Auth.federatedSignIn({ provider: 'Google'})
        }}>Google SignIn</button>
      </div>

    );
}
