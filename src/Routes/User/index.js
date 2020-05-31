import React from 'react';

import { Route, Switch } from 'react-router-dom';

import SignIn from '../../components/User/SignIn';
import SignOut from '../../components/User/SignOut';

export const UserRoutes = () => {
  return (
    <Switch>
      <Route path="/user/sign_in" component={SignIn} />
      <Route path="/user/sign_out" component={SignOut} />
    </Switch>
  );
}