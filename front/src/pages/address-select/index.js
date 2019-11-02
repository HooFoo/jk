import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';

import TopBar from '../../components/shared/top-bar';
import MapYandexWrapper from '../../components/pages/address-select/map-yandex-wrapper';

class AddressSelectPage extends Component {
  render() {
    return <Fragment>
      <TopBar />
      <MapYandexWrapper />
    </Fragment>;
  }
}

const useStyles = () => ({
});

export default withStyles(useStyles)(AddressSelectPage);
