import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import {
  GridList,
  GridListTile,
  GridListTileBar,
  Paper,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormControl
} from '@material-ui/core';

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
        <Paper className={classes.filters}>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="category">Категория</InputLabel>
            <Select
              id="category"
              value={1}
              className={classes.category}
            >
              <MenuItem value={1}>Категория 1</MenuItem>
              <MenuItem value={2}>Категория 2</MenuItem>
              <MenuItem value={3}>Категория 3</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="search">Поиск по объявлениям</InputLabel>
            <Input id="search" value={""} />
          </FormControl>
        </Paper>

        <GridList cellHeight={180} className={classes.gridList}>
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

const useStyles = (theme) => ({
    root: {
      
    },
    filters: {
      'margin-bottom' : '10px',
    },
    textField: {
      
    },
    category: {
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    gridList: {
      height: 'calc(100vh - 77px)',
      overflow: 'auto',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });

const dependencies = {
  advertisementsRepository: AdvertisementRepository
};

export default withStyles(useStyles)(inject(dependencies, Advertisements));
