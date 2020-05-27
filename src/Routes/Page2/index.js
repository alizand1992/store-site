import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Page2 from '../../components/Page2';
import New from '../../components/Page2/Post/New';

export const Page2Routes = () => {
  return (
    <Switch>
      <Route exact path={`/post/new`} component={New} />
      <Route path={`/post`} component={Page2} />
    </Switch>
  );
};

export default Page2Routes;