import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddressSelectPage from './pages/address-select'

export default function Routes() {
  return <Router>
    <Switch>
      <Route exact path="/" component={ AddressSelectPage } />
    </Switch>
  </Router>;
}