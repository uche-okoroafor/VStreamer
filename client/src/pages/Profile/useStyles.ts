import { makeStyles } from '@material-ui/core/styles';

export const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (
  name: string,
  width: number,
  height: number,
): {
  sx: {
    bgcolor: string;
    width: number;
    height: number;
  };
  children: string;
} => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width,
      height,
    },
    children: `${name[0]}`,
  };
};

const useStyles = makeStyles((theme) => ({
  profile: {
    color: 'white',
  },
  videos: {
    minHeight: '90vh',
  },
  videoContainer: {
    display: 'flex',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    textOverflow: 'ellipsis',
    [theme.breakpoints.down(1200)]: {
      flexDirection: 'column',
    },
  },
  videoDetailsContainer: {
    padding: '0 10px',
    [theme.breakpoints.down(1200)]: {
      paddingTop: '10px',
    },
  },
  iconButton: {
    position: 'absolute',
    right: '10%',
    top: '80%',
    background: 'green',
    '&:hover': {
      background: 'green',
    },
  },
  followerList: { right: '-50%' },
  viewsList: { right: '10%' },
  bottomSpace: { marginBottom: '30px' },

  followersContainer: {
    position: 'relative',
    borderRadius: '5px',
    padding: '4px',
    '&:hover': {
      background: '#1871CA',
      '& $list': {
        display: 'block',
      },
    },
  },

  list: {
    display: 'none',
  },
  folder: {
    position: 'absolute',
    right: '10%',
    top: '80%',
    background: 'green',
    '&:hover': {
      background: 'green',
    },
  },
  btnContainer: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px',
    margin: '0 auto',
  },
  loadingIcon: {
    fontSize: 0,
    width: '20px',
    height: '20px',
  },
  updateForm: { position: 'fixed', width: '100%', height: '100vh', left: 0, top: 0 },
}));

export default useStyles;
