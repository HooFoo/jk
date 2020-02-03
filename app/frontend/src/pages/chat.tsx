import * as React from 'react';

import { withStyles, WithStyles } from '@material-ui/styles';

import { Theme, createStyles } from '@material-ui/core/styles';

import withDependencies from '../dependency-injection/with-dependencies';
import { ResolveDependencyProps } from '../dependency-injection/resolve-dependency-props';
import { RouteComponentProps } from 'react-router-dom';


interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any>, ResolveDependencyProps {
}

interface IState {
}

class ChatPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <h1>Тут скоро будет чат</h1>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});

export default withStyles(styles)(withDependencies(ChatPage));