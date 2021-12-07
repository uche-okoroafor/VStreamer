import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  textSpacing: {
    margin: '5px 0',
    fontSize: '0.8rem',
  },
  imageBox: {
    height: '16rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    height: '3rem',
    width: '3rem',
    margin: '2rem',
  },
  typography: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  buttonStyle: {
    marginBottom: 16,
    marginTop: '2rem',
    width: '80%',
  },
});

export default useStyles;
