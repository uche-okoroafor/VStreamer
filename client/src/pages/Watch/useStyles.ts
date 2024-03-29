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
  videos: {
    minHeight: '90vh',
  },
  videoContainer: {
    marginBottom: '5px ',
  },
  addCommentBtn: { position: 'absolute', marginTop: '-3rem', right: '0%', background: '#1976D2' },
  viewsContainer: {
    cursor: 'pointer',
    position: 'relative',

    '&:hover': {
      '& $list': {
        display: 'block',
      },
    },
  },
  likeContainer: {
    position: 'relative',

    '&:hover': {
      '& $list': {
        display: 'block',
      },
      '& $listLikes': {
        display: 'block',
      },
    },
  },
  list: {
    display: 'none',
    // top: '1.7rem',
  },
  listLikes: {
    display: 'none',
    left: '100%',
  },

  watchedVideoTitle: {
    display: 'none',
    color: '#EEEEEE',
    position: 'absolute',
    left: '7%',
  },
  videoPlayerContainer: {
    background: 'black',
    position: 'relative',

    '&:hover': {
      '& $watchedVideoTitle': {
        display: 'flex',
      },
    },
  },
}));

export default useStyles;
