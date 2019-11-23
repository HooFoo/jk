import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';

import inject from "../helpers/inject";
import AdvertisementsRepository from '../repositories/advertisements-repository';
import BuildingRepository from '../repositories/building-repository';

import Advertisements from '../components/pages/building/advertisements';
import NavBar from '../components/shared/nav-bar';

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
    value: "advertisements",
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, newValue) {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, history } = this.props;
    const { match: { params: { uid } } } = this.props;
    const { value } = this.state;

    return (<Fragment>
      <NavBar>
        <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="scrollable force tabs example"
          >
          <Tab icon={<ChatTwoToneIcon />} value="chat" />
          <Tab icon={<AddShoppingCartTwoToneIcon />} value="advertisements" />
        </Tabs>
      </NavBar>
      <Container maxWidth="md" className={classes.content}>
        { value == "advertisements" &&
          <Advertisements uid={uid} history={history} />
        }
      </Container>
    </Fragment>);
  }
}

const useStyles = () => ({
  root: {
    height: 'calc(100vh - 64px)',
  },
  content: {
    padding: 0,
  }
});

const dependencies = {
  advertisementsRepository: AdvertisementsRepository,
  buildingsRepository: BuildingRepository
};

export default withStyles(useStyles)(inject(dependencies, BuildingPage));
