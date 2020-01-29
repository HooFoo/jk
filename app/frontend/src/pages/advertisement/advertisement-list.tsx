import * as React from 'react';

import { withStyles, WithStyles } from '@material-ui/styles';

import { Theme, createStyles } from '@material-ui/core/styles';
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
  Tooltip,
  Zoom
} from '@material-ui/core';

import AdvertisementRepository from '../../repositories/advertisement-repository';
import CategoryRepository from '../../repositories/category-repository';
import Advertisement from '../../models/advertisement';
import Category from '../../models/category';
import withDependencies from '../../dipendency-injection/with-dependencies';
import { ResolveDependencyProps } from '../../dipendency-injection/resolve-dependency-props';
import { RouteComponentProps } from 'react-router-dom';


interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
  isFetching: boolean,
  advertisements: Advertisement[],
  categories: Category[],
  categoryValue: string,
}

class AdvertisementListPage extends React.Component<IProps, IState> {
  private сategoryRepository: CategoryRepository;
  private advertisementRepository: AdvertisementRepository;

  constructor(props: IProps) {
    super(props);

    this.сategoryRepository = props.resolve(CategoryRepository);
    this.advertisementRepository = props.resolve(AdvertisementRepository);

    this.state = { 
      isFetching: true,
      advertisements: [],
      categories: [],
      categoryValue: "",
    }

    this.onAddClick = this.onAddClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCategories()
      .then(() => this.fetchAdvertisements());
  }

  fetchCategories() {
    const uid = this.props.match.params.uid;
    return this.сategoryRepository.index(this.uid).then(data => {
      this.setState({
        ...this.state,
        categories: data
      });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, isFetching: false });
    });
  }

  fetchAdvertisements() {
    this.advertisementRepository.index(this.uid).then(data => {
      this.setState({
        ...this.state,
        advertisements: data,
        isFetching: false
      })
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, isFetching: false });
    });
  }

  onAddClick() {
    const { history } = this.props;
    return history.push(`/building/${this.uid}/advertisements/edit`)
  }

  handleChange(name: any) { 
    return (event: any) => {
      this.setState({
        ...this.state,
        [name]: event.target.value
      });
    };
  }

  getCurrencySymbol = (currency: string) => {
    switch(currency){
      case 'RUB':
        return '₽';
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      default:
        return 'unknown currency';
    }
  }

  private get uid() {
    return this.props.match.params.uid;
  }

  render() {
    const { classes } = this.props;
    const { isFetching, categories, advertisements } = this.state;

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
              className={classes.category}
              value={this.state.categoryValue}
              onChange={this.handleChange('categoryValue')}
            >
              {categories.map((x, index) => (
                <MenuItem key={index} value={x.id}>{x.name}</MenuItem>
              ))}
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
                subtitle={<span>{categories.find(x => x.id == tile.category)?.name}</span>}
                actionIcon={
                  <React.Fragment>
                    <Tooltip 
                      disableFocusListener
                      title={tile.description}
                      placement="left"
                      TransitionComponent={Zoom}>
                      <IconButton className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Typography className={classes.price} variant="h5">{tile.price} {this.getCurrencySymbol(tile.currency)}</Typography>
                  </React.Fragment>
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

const styles = (theme: Theme) => createStyles({
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
    height: 'calc(100vh - 188px)',
    overflow: 'auto',
    margin: '0!important',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
    padding: '0px 10px 6px 10px;',
  },
  price: {
    color: '#ffffff',
    display: 'inline-block',
    'margin-right': '10px',
  }
});

export default withStyles(styles)(withDependencies(AdvertisementListPage));