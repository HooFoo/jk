import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddressSelectPage from './containers/pages/address-select/address-select-page'
import BuildingPage from './pages/building'

export default function Routes() {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
      <Route exact path="/address/:uid" component={ BuildingPage } />
    </Switch>
  </Router>;
}
