import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

class BottomBar extends Component {

  render() {
    const { classes, children } = this.props;

    return (
      <React.Fragment>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <div className={classes.grow} />
            {children}
            <div className={classes.grow} />
            <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }

}

const useStyles = (theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    height: '60px',
  },
  grow: {
    flexGrow: 0.5,
  },
});

export default withStyles(useStyles)(BottomBar);
