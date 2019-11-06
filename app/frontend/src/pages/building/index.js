import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

class BuildingPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
    advertisementsRepository: PropTypes.func.isRequired,
    buildingsRepository: PropTypes.func.isRequired,
  }

  state = { }

  render() {
    const { classes } = this.props;
    const { match: { params: { uid } } } = this.props;

    return <Fragment>
      <Container maxWidth="md">
        <Typography variant="h1">Building Page: {uid}</Typography>
      </Container>
    </Fragment>;
  }
}

const useStyles = () => ({
});

export default withStyles(useStyles)(BuildingPage);
