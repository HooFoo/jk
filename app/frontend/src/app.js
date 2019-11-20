import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors'

import Routes from './routes'

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: grey[300]
    }
  },
  typography: {
    // // Use the system font instead of the default Roboto font.
    // fontFamily: [
    //   '"Lato"',
    //   'sans-serif'
    // ].join(',')
  },
  overrides: {
    // Style sheet name ⚛️
    MuiSelect: {
      // Name of the rule
      root: {
        // Some CSS
        color: blue[900],
      },
    },
  },
});

class App extends Component {
  render() {
    return (
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
    );
  }
}

export default App;
