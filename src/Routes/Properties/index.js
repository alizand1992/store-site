import React from 'react';

import { Route } from 'react-router-dom';

import New from '../../components/Properties/Edit';

export const PropertyRoutes = () => {
  return <Route exact path="/properties/new" component={New} />;
};