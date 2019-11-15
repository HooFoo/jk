import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { notBlank } from "../../helpers/ramda-helper";

import { Button, Container, Grid, Snackbar, Typography } from '@material-ui/core';

import inject from "../../helpers/inject";
import AddressRepository from "../../repositories/address-repository";

import MapYandexWrapper from '../../components/pages/address-select/map-yandex-wrapper';

class AddressSelectPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addressRepository: PropTypes.func.isRequired
  };

  state = { address: null, uid: null, loading: false, error: null };

  onAddressSelect = (address, uid) => {
    this.setState({ address, uid });
  };

  onButtonClick = () => {
    const { addressRepository, history } = this.props;
    const { address, uid } = this.state;

    this.setState({ loading: true });
    if (notBlank(uid)) {
      return history.push(`/building/${uid}`)
    } else {
      return addressRepository.index(address)
        .then((building) => {
          history.push(`/building/${building.uid}`);
        })
        .catch(()=>{
          this.setState({ error: 'Адрес не может быть загружен' });
        })
        .finally(()=>{
          this.setState({ loading: false });
        });
    }
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
        <Snackbar open={notBlank(error)} onClose={this.onSnackbarClose} message={error} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} autoHideDuration={2000} />
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

const dependencies = {
  addressRepository: AddressRepository
};

export default withStyles(useStyles)(inject(dependencies, AddressSelectPage));
