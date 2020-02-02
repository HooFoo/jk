import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import { notBlank } from "../helpers/ramda-helper";

import { Button, Container, Grid, Snackbar, Typography, Theme } from '@material-ui/core';

import AddressRepository from "../repositories/address-repository";

import MapYandexWrapper from '../components/pages/address-select/map-yandex-wrapper';
import { ResolveDependencyProps } from '../dependency-injection/resolve-dependency-props';
import withDependencies from '../dependency-injection/with-dependencies';

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
  address: string,
  uid: string;
  loading: boolean,
  error: any,
}

class AddressSelectPage extends React.Component<IProps, IState> {
  private addressRepository: AddressRepository;

  constructor(props: IProps) {
    super(props);

    this.addressRepository = new AddressRepository();

    this.state = {
      address: "",
      uid: "",
      loading: false,
      error: null
    };
  }

  onAddressSelect = (address:string, uid: string) => {
    this.setState({ address, uid });
  };

  onButtonClick = () => {
    const { history } = this.props;
    const { address, uid } = this.state;

    this.setState({ loading: true });
    if (notBlank(uid)) {
      return history.push(`/building/${uid}`)
    } else {
      return this.addressRepository.index(address)
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

    return <React.Fragment>
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
    </React.Fragment>;
  }
}

const styles = (theme: Theme) => createStyles({
  titleBar: {
  },
  addressBox: {
  },
  button: {
  },
  centered: {
  }
});

export default withStyles(styles)(withDependencies(AddressSelectPage));
