import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Open Sans", "sans-serif", "Roboto"',
    fontSize: 12,
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  palette: {
    primary: { main: '#3A8DFF' },
    secondary: { main: '#ef3f40' },
    success: { main: '#199401' },
    // warning: { main: '#E00000' },
  },
  shape: {
    borderRadius: 5,
  },
});
