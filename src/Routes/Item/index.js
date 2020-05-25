import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Information from '../../components/Items/Item/New/Information';
import Attributes from '../../components/Items/Item/New/Attributes';
import Images from '../../components/Items/Item/New/Images';
import Item from '../../components/Items/Item/Show';

export const ItemRoutes = () => {
  return (
    <Switch>
      <Route exact path="/item/new/information" component={Information}/>
      <Route exact path="/item/new/:id/attributes" component={Attributes}/>
      <Route exact path="/item/new/:id/images" component={Images}/>
      <Route exact path="/item/:id" component={Item}/>
    </Switch>
  );
};
