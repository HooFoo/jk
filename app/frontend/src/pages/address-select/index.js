import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { go } from '../../helpers/navigation-helper';

import {Button, Container, Grid, Snackbar, Typography, IconButton, CloseIcon} from '@material-ui/core';

import MapYandexWrapper from '../../containers/pages/address-select/map-yandex-wrapper';

class AddressSelectPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addressRepository: PropTypes.func.isRequired
  };

  state = { address: null, uid: null, loading: false, error: null };

  onAddressSelect = (address, uid) => {
    this.setState({ address, uid });
  };

  onButtonClick = () => {
    const { addressRepository } = this.props;
    const { address } = this.state;

    this.setState({ loading: true });
    return addressRepository.index(address)
      .then((building) => {
        go(`/building/${building.uid}`);
      })
      .catch(()=>{
        this.setState({ error: 'Адрес не может быть загружен' });
      })
      .finally(()=>{
        this.setState({ loading: false });
      });
  };

  onSnackbarClose = () => {
    this.setState({ error: null });
  }

  render() {
    const { classes } = this.props;
    const { address, loading, error } = this.state;

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
                ? <Button variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                  onClick={this.onButtonClick}>{ loading ? 'Загрузка...' : 'Перейти в сообщество дома' }
                </Button>
                : ''
            }
          </Grid>
        </Grid>
        <Snackbar open={error} onClose={this.onSnackbarClose} message={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} autoHideDuration={2000} />
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
  }
});

export default withStyles(useStyles)(AddressSelectPage);
