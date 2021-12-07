import { makeStyles } from '@material-ui/core/styles';
import image from '../../Images/backgroundImg.jpg';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    backgroundColor: 'rgb(0, 0, 0, 0.8)',
    backgroundRepeat: ' no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${image})`,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    padding: '20px',
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
}));

export default useStyles;
