import { makeStyles } from '@material-ui/core/styles';
import image from '../../Images/backgroundImg.jpg';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    background: `linear-gradient( rgba(0, 0, 0, 0.3) 100%, rgba(0, 0, 0, 0.3)100%),url(${image})`,
    backgroundRepeat: ' no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    padding: '20px',
    paddingTop: '0',
  },

  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    paddingTop: 23,
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
  loginContainer: {
    background: 'rgb(25, 118, 210,0.8)',
    padding: '20px 30px',
  },
}));

export default useStyles;
