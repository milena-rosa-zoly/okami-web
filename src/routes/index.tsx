import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import PasswordForget from "../pages/PasswordForget";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/password-forget" component={PasswordForget} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}

export default Routes;
