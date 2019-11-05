import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Button,Container, Grid, Typography } from '@material-ui/core';

import MapYandexWrapper from '../../containers/pages/address-select/map-yandex-wrapper';

class AddressSelectPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = { address: undefined, uid: undefined }

  onAddressSelect = (address, uid) => {
    this.setState({ address, uid });
  }

  onButtonClick = () => {

  }

  render() {
    const { classes } = this.props;
    const { address } = this.state;

    return <Fragment>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs={12}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom> Добро пожаловать в Home Spot</Typography>
            <Typography variant="h5" align="center" color="textPrimary" gutterBottom> место, где вы можете пообщаться с соседями</Typography>
          </Grid>
          <MapYandexWrapper onAddressSelect={this.onAddressSelect} />
          <Grid item xs={12}>
            <Typography variant="body1" align="center" color="textPrimary" gutterBottom> { address ? address : 'Выберите ваш адрес' }</Typography>
          </Grid>
          <Grid container justify="center">
            {
              address
                ? <Button variant="contained" color="primary" className={classes.button}> Перейти в сообщество дома </Button>
                : ''
            }
          </Grid>
        </Grid>
      </Container>
    </Fragment>;
  }
}

const useStyles = () => ({
  titleBar: {

  },
  addressBox: {

  },
  button: {

  },
  centered: {
    textAlign: 'center',
    width: '100vw%',
    margin: '0 auto'
  }
});

export default withStyles(useStyles)(AddressSelectPage);
