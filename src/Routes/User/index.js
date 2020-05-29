import React from 'react';

import { Route, Switch } from 'react-router-dom';

import SignIn from '../../components/User/SignIn';

export const UserRoutes = () => {
  return (
    <Switch>
      <Route path="/user/sign_in" component={SignIn} />
    </Switch>
  );
}