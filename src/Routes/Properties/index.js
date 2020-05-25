import React from 'react';

import { Route } from 'react-router-dom';

import Edit from '../../components/Properties/Edit';

export const PropertyRoutes = () => {
  return <Route exact path="/properties/edit" component={Edit} />;
};