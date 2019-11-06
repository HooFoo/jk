import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AddressSelectPage from './containers/pages/address-select/address-select-page'
import BuildingPage from './containers/pages/building/building-page'

export default function Routes() {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
      <Route path="/building/:uid" component={ BuildingPage } />
    </Switch>
  </Router>;
}
