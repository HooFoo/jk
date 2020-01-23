import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';

import { Container, Theme } from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';

import Advertisements from '../components/pages/building/advertisements';
import NavBar from '../components/shared/nav-bar';

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
}

interface IState {
  value: string
}

class BuildingPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      value: "advertisements"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any, newValue: string) {
    this.setState({ value: newValue });
  };

  render() {
    const { classes, history } = this.props;
    const { match: { params: { uid } } } = this.props;
    const { value } = this.state;

    return (<React.Fragment>
      <NavBar>
        <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="scrollable force tabs example"
          >
          <Tab icon={<ChatTwoToneIcon />} value="chat" />
          <Tab icon={<AddShoppingCartTwoToneIcon />} value="advertisements" />
        </Tabs>
      </NavBar>
      <Container maxWidth="md" className={classes.content}>
        { value == "advertisements" &&
          <Advertisements uid={uid} history={history} />
        }
      </Container>
    </React.Fragment>);
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    height: 'calc(100vh - 64px)',
  },
  content: {
    padding: 0,
  }
});

export default withStyles(styles)(BuildingPage);
