import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddressSelectPage from './pages/address-select';
import BuildingPage from './pages/building';

export const Routes: React.FC = () => {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
      <Route path="/building/:uid/:section" component={ BuildingPage } />
      <Route path="/building/:uid" component={ BuildingPage } />
    </Switch>
  </Router>;
}
