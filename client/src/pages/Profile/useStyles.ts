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
  // root: {
  //   minHeight: '100vh',
  //   '& .MuiInput-underline:before': {
  //     borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
  //   },
  // },
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

  bottomSpace: { marginBottom: '30px' },
}));

export default useStyles;
