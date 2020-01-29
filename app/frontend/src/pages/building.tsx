import * as React from 'react';
import { RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';

import { withStyles, createStyles, WithStyles } from '@material-ui/styles';

import { Container, Theme } from '@material-ui/core';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ChatTwoToneIcon from '@material-ui/icons/ChatTwoTone';
import AddShoppingCartTwoToneIcon from '@material-ui/icons/AddShoppingCartTwoTone';

import NavBar from '../components/shared/nav-bar';

import ChatPage from './chat';
import AdvertisementsPage from './advertisement/advertisements';
import AdvertisementAddPage from './advertisement/advertisement-add';


interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
}

interface IState {
}

class BuildingPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any, value: string) {
    const { history } = this.props;
    return history.push(`/building/${this.uid}/${value}`)
  };

  private get selectedTab() {
    let selectedTab: string = "chat";

    const path = this.props.location.pathname.trimLeft("/");
    if (path.endsWith("advertisements") || path.endsWith("advertisement-add")) {
      selectedTab = "advertisements";
    }

    return selectedTab;
  }

  private get uid() {
    return this.props.match.params.uid;
  }

  render() {
    const { classes } = this.props;

    return (<React.Fragment>
      <NavBar>
        <Tabs
            value={this.selectedTab}
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
        <Switch>
          <Redirect exact from="/building/:uid/" to="/building/:uid/chat" />
          <Route path="/building/:uid/:section" render={ (props) => {
              switch(props.match.params.section) {
                case "chat":
                  return <ChatPage {...props} />
                case "advertisements":
                  return <AdvertisementsPage {...props} />;
                case "advertisement-add":
                  return <AdvertisementAddPage {...props} />;
              }
            }
          }/>
        </Switch>
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
