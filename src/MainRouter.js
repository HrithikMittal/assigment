import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Menu from "./core/Menu";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => {
  return (
    <div>
      <Menu></Menu>
      <Switch>
        <PrivateRoute path="/" exact component={Home}></PrivateRoute>
        <Route path="/signup" exact component={Signup}></Route>
        <Route path="/signin" exact component={Signin}></Route>
      </Switch>
    </div>
  );
};

export default MainRouter;
