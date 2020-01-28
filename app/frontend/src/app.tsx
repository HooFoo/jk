import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import { grey, deepOrange } from '@material-ui/core/colors';

import { Routes } from './routes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[300]
    },
    secondary: {
      main: deepOrange[500]
    },
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
        //color: deepOrange[500],
      },
    },
    MuiInputLabel: {
      root: {
        color: deepOrange[500],
      },
    },
    MuiInputAdornment: {
      root: {
        color: deepOrange[500],
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "0.8em",
        'text-overflow': 'ellipsis',
        'overflow': 'hidden',
        'max-width': '200px',
        'white-space': 'nowrap',
      }
    }
  },
});

export class App extends React.Component {
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </div>
    );
  }
}