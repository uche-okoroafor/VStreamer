import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
  textFontSize: {
    fontSize: '0.8rem',
  },
  clickAndPlay: {
    borderRadius: '1rem',
    background: 'rgb(5,5,5)',
    padding: '10px 20px',
  },

  clickAndPlayTitle: {
    padding: '1.2rem',
    borderRadius: '50%',
    background: 'black',
    marginRight: '10px',
    color: '#EEEEEE',
  },
  clickAndPlayTitleContainer: { position: 'absolute', top: '6%', left: '3%', display: 'flex', alignItems: 'center' },
  clickAndPlayContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    color: 'white',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      '& $clickAndPlay': {
        background: '#1976D2',
      },
    },
  },
  videoTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '80%',
  },
  textSpacing: {
    margin: '5px 0',
    fontSize: '0.8rem',
    '&:hover': {
      '& $list': {
        display: 'block',
      },
    },
  },
  likesContainer: {
    '&:hover': {
      '& $list': {
        display: 'block',
      },
    },
  },
  list: {
    display: 'none',
    left: '20%',
  },
}));

export default useStyles;
