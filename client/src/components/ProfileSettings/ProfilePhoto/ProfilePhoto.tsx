import { Avatar, Box, Button, Paper, Typography } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import useStyles from './useStyles';

export default function ProfilePhoto(): JSX.Element {
  const classes = useStyles();

  return (
    //TODO - Create reuseable Paper&Box Component
    <Paper className={classes.paper} elevation={4}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Typography align="center" className={classes.title} variant="h4">
          Profile Photo
        </Typography>
        {/* TODO - use the AvatarDisplay component */}
        <Avatar className={classes.avatar} src={`https://robohash.org/demo.png`} />
        <Typography className={classes.secondaryText}>Be sure to use a photo that clearly shows your face</Typography>
        <Button className={classes.uploadBtn} variant="outlined" color="secondary">
          Upload a file from your device
        </Button>
        <Button startIcon={<DeleteForeverIcon />}>Delete Photo</Button>
      </Box>
    </Paper>
  );
}
