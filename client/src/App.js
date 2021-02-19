import React from "react";
import "./styles.scss";
import Amplify from "aws-amplify";

import { ProtectedRoute } from "./routes/protected";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Signup from "./screens/signup";
import SignIn from "./screens/signin";
import ConfirmCode from "./screens/confirmCode";
import HomePage from "./screens/homePage";
import DashboardPage from "./screens/dashboard";
import JWT from "jsonwebtoken";

// Amplify configured
Amplify.configure({
  Auth: {
    identityPoolId: "us-east-2:890369dc-0696-48a9-8c77-b097502df181",
    region: "us-east-2",
    identityPoolRegion: "us-east-2",
    userPoolId: "us-east-2_wSwfNHiZC",
    userPoolWebClientId: "2flvubsspmfn5n1juv0adb83nq",
    oauth: {
      domain: "authdemoz.auth.us-east-2.amazoncognito.com",
      redirectSignIn: "http://localhost:3000/",
      redirectSignOut: "http://localhost:3000/",
      responseType: "token", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
});

const App = () => {
  const AccessToken = localStorage.getItem("AccessToken");
  const decodeAccess = JWT.decode(AccessToken);
  console.log(decodeAccess);
  return (
    <div className="App">
      <Router>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/verify-code" component={ConfirmCode} />
        <Route exact path="/" component={HomePage} />
        <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
      </Router>
    </div>
  );
};

export default App;
