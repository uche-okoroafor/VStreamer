import Button from '@mui/material/Button';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography, Box } from '@mui/material';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box display={'flex'} alignItems={'center'} width="100%" justifyContent={'space-between'}>
      <Box sx={{ marginLeft: { sm: '14px', xs: '0', md: '23px' } }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { sm: '1.6rem', xs: '1.5rem', md: '2rem' },
          }}
        >
          VStreamer
        </Typography>
      </Box>
      <Box className={classes.authHeader}>
        <Typography
          className={classes.accAside}
          sx={{
            display: { sm: 'none', xs: 'none', md: 'inline' },
            margin: '0 10px',
          }}
        >
          {asideText}
        </Typography>
        <Link to={linkTo} className={classes.link}>
          <Button
            color="primary"
            className={classes.accBtn}
            sx={{
              width: { xs: 130, sm: 150, md: 170 },
              height: { xs: 40, sm: 45, md: 54 },
              whiteSpace: 'nowrap',
            }}
            variant="contained"
          >
            <Typography variant="subtitle2">{btnText}</Typography>
          </Button>
        </Link>
      </Box>{' '}
    </Box>
  );
};

export default AuthHeader;
