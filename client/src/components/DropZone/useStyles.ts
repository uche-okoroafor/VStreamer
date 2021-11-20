import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dropBoxContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '22rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  dropBox: {
    backgroundColor: '#fff',
    // border: '2px solid #000',
    width: 400,
    boxShadow: '24',
    padding: 4,
  },
  imageBox: {
    height: '16rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed #3a8dff',
  },
  imageBoxAccept: {
    height: '16rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed green',
  },
  imageBoxReject: {
    height: '16rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed red',
  },
  uploadImage: {
    height: '3rem',
    width: '3rem',
    margin: '2rem',
  },
  typographyBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  typography: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  typographySpan: {
    color: '#3a8dff',
  },
});

export default useStyles;
