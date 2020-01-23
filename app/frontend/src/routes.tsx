import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AddressSelectPage from './pages/address-select';
import BuildingPage from './pages/building';
import AdvertisementAddPage from './pages/advertisement-add';

export const Routes: React.FC = () => {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
      <Route exact path="/building/:uid" component={ BuildingPage } />
      <Route path="/building/:uid/advertisement-add" component={ AdvertisementAddPage } />
    </Switch>
  </Router>;
}