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
  }
});

// Signup Method
async function signUp({name, email, password}) {
  try {
      const { user } = await Auth.signUp({
          username: email,
          password,
          attributes: {
              name,
              email
          }
      });
      console.log("*****User successfully Registerd..", user);
  } catch (error) {
      console.log('error signing up:', error);
  }
}

const Signup = () => {
  const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const [user, setUser] = useState(null);

console.log("user state values",user) 
    const onSubmit = (data) => {
        setUser(data);
        signUp(data);
        history.push({pathname: '/verify-code', state: { userName: user?.email }});
    };
    return (
      <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" placeholder = "Enter your Name" defaultValue="TestUser" ref={register} />
          {errors.name && <span>Name is required</span>}
          <input name="email" placeholder = "*Enter your Email" ref={register({ required: true })} />
          {errors.email && <span>Email is required</span>}
          <input name="password" placeholder = "Enter your Password" ref={register} />
          {errors.name && <span>Name is required</span>}
          {errors.password && <span>Password is required</span>}
          <input type="submit" value = "Signup"/>
          <p>Already have an account?<Link to = "/signin">SignIn</Link></p>
      </form>
      </div>
    );
}

export default Signup; 
