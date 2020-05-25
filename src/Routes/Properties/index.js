import React from 'react';

import { Route } from 'react-router-dom';
import New from '../../components/Properties/New';

export const PropertyRoutes = () => {
  return (
    <React.Fragment>
      <Route path="/properties/new" component={New} />
    </React.Fragment>
  )
};