import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';

import { Container, Typography } from '@material-ui/core';

class BuildingPage extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  state = { }

  constructor(props) {
    const { uid } = useParams();
    const extendedProps = { uid, ...props };

    super(extendedProps);
  }

  render() {
    const { classes } = this.props;

    return <Fragment>
      <Container maxWidth="md">
        <Typography variant="h1">Building Page</Typography>
      </Container>
    </Fragment>;
  }
}

const useStyles = () => ({
});

export default withStyles(useStyles)(BuildingPage);
