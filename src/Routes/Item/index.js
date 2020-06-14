import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Information from '../../components/Items/Item/Common/Information';
import Attributes from '../../components/Items/Item/Common/Attributes';
import Images from '../../components/Items/Item/Common/Images';
import Item from '../../components/Items/Item/Show';
import New from '../../components/Items/Item/New';
import Edit from '../../components/Items/Item/Edit';
import Thumbnail from '../../components/Items/Item/Common/Thumbnail';

export const ItemRoutes = () => {
  return (
    <Switch>
      <Route exact path="/item/new/information" component={Information} />
      <Route exact path="/item/new/:id/attributes" component={Attributes} />
      <Route exact path="/item/new/:id/images" component={Images} />
      <Route exact path="/item/new/:id/thumbnail" component={Thumbnail} />
      <Route exact path="/item/new" component={New} />
      <Route exact path="/item/edit/:id/information" component={Information} />
      <Route exact path="/item/edit/:id/attributes" component={Attributes} />
      <Route exact path="/item/edit/:id/images" component={Images} />
      <Route exact path="/item/edit/:id/thumbnail" component={Thumbnail} />
      <Route exact path="/item/edit/:id" component={Edit} />
      <Route exact path="/item/:id" component={Item} />
    </Switch>
  );
};
