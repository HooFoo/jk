import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { BottomNavigation, BottomNavigationAction, Container, Typography } from '@material-ui/core';
import { Favorite, Restore }  from '@material-ui/icons';

import Advertisements from '../../containers/pages/building/advertisements';

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

export default withStyles(useStyles)(BuildingPage);
