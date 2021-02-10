import React from "react";
import './App.css';

import {BrowserRouter as Router, Route } from 'react-router-dom';
import Signup from './signup';
import SignIn from './signin';
import ConfirmCode from './confirmCode';
import HomePage from './homePage';
import SocialAuth from './socialAuth';


const App = () => {
  return (
    <div className="App">
      <Router>
          <Route exact path = '/' component = {Signup} />
          <Route exact path = '/signin' component = {SignIn} />
          <Route exact path = '/verify-code' component = {ConfirmCode} />
          <Route exact path = '/welcome-page' component = {HomePage} />
          <Route exact path = '/social-auth' component = {SocialAuth} />
      </Router>
    </div>
  );
}

export default App;
