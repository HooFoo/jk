import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { BottomNavigation, BottomNavigationAction, Container, Typography } from '@material-ui/core';
import { Favorite, Restore }  from '@material-ui/icons';

import inject from "../../helpers/inject";
import AdvertisementsRepository from '../../repositories/advertisements-repository';
import BuildingRepository from '../../repositories/building-repository';

import Advertisements from '../../components/pages/building/advertisements';
import TopBar from '../../components/shared/top-bar';

class BuildingPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
    advertisementsRepository: PropTypes.func.isRequired,
    buildingsRepository: PropTypes.func.isRequired,
  }

  state = { 
    value: "chat",
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    const { match: { params: { uid } } } = this.props;
    const { value } = this.state;

    return (<Fragment>
      <TopBar></TopBar>
      <Container maxWidth="md">
        <Typography variant="h1">Building Page: {uid}</Typography>
        <Advertisements uid={uid} />
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
          <BottomNavigationAction label="Чат" value="chat" icon={<Restore />} />
          <BottomNavigationAction label="Объявления" value="advertisements" icon={<Favorite />} />
        </BottomNavigation>
      </Container>
    </Fragment>);
  }
}

const useStyles = () => ({
});

const dependencies = {
  advertisementsRepository: AdvertisementsRepository,
  buildingsRepository: BuildingRepository
};

export default withStyles(useStyles)(inject(dependencies, BuildingPage));
