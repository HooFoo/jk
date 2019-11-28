import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import AddIcon from '@material-ui/icons/Add';

import {
  Typography,
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
  Paper,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Fab,
  IconButton,
  Tooltip
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

  constructor(props) {
    super(props);

    this.onAddClick = this.onAddClick.bind(this);
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

  onAddClick() {
    const { uid, history } = this.props;
    return history.push(`/building/${uid}/advertisement-add`)
  }

  render() {
    const { classes, uid } = this.props;
    const { isFetching, advertisements } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.filters}>

          <Box fontFamily="fontFamily" className={classes.title}>
            <Typography variant="h5">Объявления</Typography>
          </Box>

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
            <TextField id="standard-secondary" label="Поиск по объявлениям" color="secondary" fullWidth={true} />
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
        <div className={classes.addButtonContainer}>
          <Tooltip title="Добавить объявление" aria-label="add" placement="top">
            <Fab color="secondary" aria-label="add" className={classes.addButton} onClick={this.onAddClick}>
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </div>
    );
  }
}

const useStyles = (theme) => ({
    root: {
      
    },
    title: {

    },
    addButtonContainer: {
      position: 'relative'
    },
    addButton: {
      display: 'flex',
      position: 'absolute',
      'z-index': 1050,
      right: '37px',
      bottom: '15px'
    },
    filters: {
      margin: '10px 0',
      padding: '6px 10px',
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
      height: 'calc(100vh - 187px)',
      overflow: 'auto',
      margin: [[0], '!important']
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });

const dependencies = {
  advertisementsRepository: AdvertisementRepository
};

export default withStyles(useStyles)(inject(dependencies, Advertisements));
