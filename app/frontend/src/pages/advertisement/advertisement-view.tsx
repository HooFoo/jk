import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles';

import {
  Typography,
  Container,
  Paper,
  Box,
  Button,
  FilledInput,
  Theme,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  GridList,
  GridListTile,
  GridListTileBar,
  CardActions,
} from '@material-ui/core';

import AdvertisementRepository from '../../repositories/advertisement-repository';

import { deepOrange } from '@material-ui/core/colors'
import { RouteComponentProps } from 'react-router-dom';
import Category from '../../models/category';
import withDependencies from '../../dependency-injection/with-dependencies';
import { ResolveDependencyProps } from '../../dependency-injection/resolve-dependency-props';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import CallIcon from '@material-ui/icons/Call';
import EditIcon from '@material-ui/icons/Edit';

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
  id: string,
  title: string,
  description: string,
  currency: string,
  price: number,
  phone: string,
  files: any[],
  categoryValue: string,
  isFetching: boolean,
  createdDate: string,
  showPhoneNumber: boolean,
  error?: string,
  editable: boolean,
}

class AdvertisementViewPage extends React.Component<IProps, IState> {
  private advertisementRepository: AdvertisementRepository;

  constructor(props: IProps) {
    super(props);

    this.advertisementRepository = props.resolve(AdvertisementRepository);

    this.state = { 
      id: '',
      title: '',
      description: '',
      phone: '+7',
      price: 0,
      currency: 'RUB',
      files: [
      ],
      categoryValue: "",
      isFetching: true,
      createdDate: "",
      showPhoneNumber: false,
      editable: false,
    };

    this.onCallClick = this.onCallClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  componentDidMount() {
    this.fetchAdvertisement(this.props.match.params.id);
  }

  fetchAdvertisement(id: string): Promise<any> {
    return this.advertisementRepository.show(this.props.match.params.uid, id).then(data => {
      this.setState({
        ...this.state,
        id: id,
        title: data.title,
        description: data.description,
        categoryValue: data.category,
        phone: data.phone,
        price: data.price,
        currency: data.currency,
        files: data.files,
        createdDate: data.createdDate,
        editable: data.editable,
        isFetching: false
      });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, error: error, isFetching: false});
    });
  }

  onCallClick() {
    window.location.href=`tel://${this.state.phone}`;
    this.setState({...this.state, showPhoneNumber: true });
  }

  onEditClick() {
    const { history } = this.props;
    return history.push(`/building/${this.uid}/advertisements/edit/${this.state.id}`)
  }

  private get uid() {
    return this.props.match.params.uid;
  }

  render() {
    const { classes } = this.props;

    return (<React.Fragment>
      <Container maxWidth="md" className={classes.root}>
        <Card className={classes.formContainer}>

        <div className={classes.imageContainer}>
          <GridList className={classes.gridList} cols={2.5}>
            {this.state.files.map((tile: any, index: number) => (
              <GridListTile key={index}>
                <img src={tile} />
              </GridListTile>
            ))}
          </GridList>
        </div>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <Typography className={classes.price} variant="h4">{this.state.price} {this.state.currency.getCurrencySymbol()}</Typography>
            }
            title="Василий Питон"
            subheader={this.state.createdDate}
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.description}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
          <Button
            disabled={this.state.isFetching}
            className={classes.button}
            variant="outlined"
            color="secondary"
            endIcon={<CallIcon>call</CallIcon>}
            onClick={this.onCallClick}
          >
            {this.state.showPhoneNumber ? this.state.phone : 'Позвонить'}
          </Button>
          {this.state.editable &&
            <Button
              disabled={this.state.isFetching}
              className={classes.button}
              variant="outlined"
              color="secondary"
              endIcon={<EditIcon>edit</EditIcon>}
              onClick={this.onEditClick}
            >
              Редактировать
            </Button>
          }
          </CardActions>

        </Card>
      </Container>
    </React.Fragment>);
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
  },
  imageContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  formContainer: {
    height: 'calc(100vh - 91px)',
    overflow: 'auto',
    'margin-top': '10px',
    padding: '10px',
  },
  avatar: {

  },
  price: {
    display: 'inline-flex',
    marginTop: '8px',
  },
  button: {
    margin: theme.spacing(1),
  },
});

export default withStyles(styles)(withDependencies(AdvertisementViewPage));