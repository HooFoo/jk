import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

class Advertisements extends Component {
  // static propTypes = {
  //   classes: PropTypes.object.isRequired,
  //   advertisementsRepository: PropTypes.func.isRequired,
  //   uid: PropTypes.string.isRequired
  // }

  state = { }

  render() {
    const { classes, uid } = this.props;

    return <Typography variant="h1">Advertisements for : {uid}</Typography>
  }
}

const useStyles = () => ({
});

export default withStyles(useStyles)(Advertisements);
