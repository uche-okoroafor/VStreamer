import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
      background: '#F2F2F7 ',
    },
  },
  profile: {
    minHeight: '90vh',
  },
  videoContainer: {
    display: 'flex',
    margin: '10px',
    padding: '10px',
    backgroundColor: '#f2f2f7',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  videos: {
    minHeight: '90vh',
  },
  videoDetailsContainer: {
    padding: '0 10px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default useStyles;
