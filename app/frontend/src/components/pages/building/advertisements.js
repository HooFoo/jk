import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import inject from '../../../helpers/inject';
import AdvertisementRepository from '../../../repositories/advertisements-repository';

class Advertisements extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    advertisementsRepository: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired
  }

  state = { 
    isFetching: true,
    advertisements: []
  }

  componentDidMount() {
    this.fetchAdvertisements();
  }

  fetchAdvertisements() {
    this.props.advertisementsRepository.index(this.props.uid).then(data => {
      this.setState({ advertisements: data, isFetching: false })
    }).catch(error => {
      console.log(error);
        this.setState({...this.state, isFetching: false });
    });
  }

  render() {
    const { classes, uid } = this.props;
    const { isFetching, advertisements } = this.state;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">December</ListSubheader>
          </GridListTile>
          {advertisements.map((tile, index) => (
            <GridListTile key={index}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                subtitle={<span>by: {tile.description}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
          {isFetching &&
            <p>Загрузка...</p>
          }
        </GridList>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

const dependencies = {
  advertisementsRepository: AdvertisementRepository
};

export default withStyles(useStyles)(inject(dependencies, Advertisements));
