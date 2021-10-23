import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    background: 'lightgrey',
    borderRadius: '50%',
    height: '25%',
    margin: theme.spacing(3),
    width: '25%',
  },
  paper: {
    margin: 'auto',
    marginTop: theme.spacing(8),
    maxWidth: '25%',
    padding: theme.spacing(3),
    width: '100%',
  },
  secondaryText: {
    color: 'grey',
    fontSize: '1em',
    textAlign: 'center',
    width: theme.spacing(20),
  },
  title: {
    margin: theme.spacing(3),
    fontWeight: 'bold',
  },
  uploadBtn: {
    color: '#ef3f40',
    fontSize: '.9em',
    height: theme.spacing(6),
    margin: theme.spacing(4),
    width: theme.spacing(25),
  },
}));

export default useStyles;
