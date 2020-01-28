import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
}

class NavBar extends React.Component<IProps, IState> {

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

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
    height: '60px',
  },
  grow: {
    flexGrow: 0.5,
  },
});

export default withStyles(styles)(NavBar);
