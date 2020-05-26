import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Edit from '../../components/About/Edit';
import About from '../../components/About';

export const AboutRoutes = () => {
  return (
    <Switch>
      <Route exact path="/about/edit" component={Edit} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
};
