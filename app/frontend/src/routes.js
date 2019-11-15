import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import AddressSelectPage from './pages/address-select/index'
import BuildingPage from './pages/building/index'

export default function Routes() {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
      <Route path="/building/:uid" component={ BuildingPage } />
    </Switch>
  </Router>;
}
