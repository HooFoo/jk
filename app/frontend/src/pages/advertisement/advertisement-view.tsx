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
} from '@material-ui/core';

import AdvertisementRepository from '../../repositories/advertisement-repository';

import { deepOrange } from '@material-ui/core/colors'
import { RouteComponentProps } from 'react-router-dom';
import Category from '../../models/category';
import withDependencies from '../../dependency-injection/with-dependencies';
import { ResolveDependencyProps } from '../../dependency-injection/resolve-dependency-props';

import MoreVertIcon from '@material-ui/icons/MoreVert';

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
  title: string,
  description: string,
  currency: string,
  price: number,
  phone: string,
  files: any[],
  categoryValue: string,
  isFetching: boolean,
  createdDate: string,
  error?: string,
}

class AdvertisementViewPage extends React.Component<IProps, IState> {
  private advertisementRepository: AdvertisementRepository;

  constructor(props: IProps) {
    super(props);

    this.advertisementRepository = props.resolve(AdvertisementRepository);

    this.state = { 
      title: '',
      description: '',
      phone: '+7',
      price: 0,
      currency: 'RUB',
      files: [
        "https://i0.wp.com/thepointsguy.com/wp-content/uploads/2019/05/chantal-garnier-1464696-unsplash.jpg"
      ],
      categoryValue: "",
      isFetching: true,
      createdDate: "3 сентября 2019"
    };
  }

  componentDidMount() {
    this.fetchAdvertisement(this.props.match.params.id);
  }

  fetchAdvertisement(id: string): Promise<any> {
    return this.advertisementRepository.show(this.props.match.params.uid, id).then(data => {
      this.setState({
        ...this.state,
        title: data.title,
        description: data.description,
        categoryValue: data.category,
        phone: data.phone,
        price: data.price,
        currency: data.currency,
        files: data.files,
      });
    }).catch(error => {
      console.log(error);
      this.setState({...this.state, error: error });
    });
  }

  render() {
    const { classes } = this.props;
    const { match: { params: { uid } } } = this.props;

    return (<React.Fragment>
      <Container maxWidth="md" className={classes.root}>
        <Card className={classes.formContainer}>

          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Василий Питон"
            subheader={this.state.createdDate}
          />

          <CardMedia
            className={classes.images}
            image={this.state.files[0]}
            title="Paella dish"
          />

          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.state.description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>);
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
  },
  formContainer: {
    height: 'calc(100vh - 91px)',
    overflow: 'auto',
    'margin-top': '10px',
    padding: '10px',
  },
  avatar: {

  },
  images: {

  }
});

export default withStyles(styles)(withDependencies(AdvertisementViewPage));