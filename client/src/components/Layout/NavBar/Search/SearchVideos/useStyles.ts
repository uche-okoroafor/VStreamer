import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#E9EEF9',
    marginLeft: 0,
    height: '50px',
    lineHeight: '18px',

    width: `calc(${drawerWidth} - 2rem)`,
  },
  searchRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    fontWeight: 600,
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    marginLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawer: {
    position: 'absolute',
    width: '100%',
    transition: 'height 1s',
    bottom: '0%',
    borderEndEndRadius: '5px',
    borderBottomLeftRadius: '5px',
    overFlow: 'hidden',
  },
  drawerBackDrop: {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    bgColor: 'black',
    left: 0,
    top: 0,
    zIndex: 1,
    cursor: ' pointer',
  },
}));

export default useStyles;
