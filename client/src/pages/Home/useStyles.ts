import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
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
  },
  videos: {
    minHeight: '90vh',
  },
}));

export default useStyles;
