import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Posts from '../../components/Posts';
import New from '../../components/Posts/Post/New';

export const PostRoutes = () => {
  return (
    <Switch>
      <Route exact path="/posts/new" component={New} />
      <Route path="/posts/" component={Posts} />
    </Switch>
  );
};
