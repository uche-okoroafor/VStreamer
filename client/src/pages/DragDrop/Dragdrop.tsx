/* eslint-disable prettier/prettier */
import { Box, Card, Button, Container, Paper, Typography, Grid } from '@material-ui/core';
import { bgcolor } from '@mui/system';
import VideosList from '../../components/VideosList/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useAuth } from '../../context/useAuthContext';
import Draggable from 'react-draggable';
import DropZone from '../../components/DropZone/DropZone';
import RenderFile from '../../components/RenderFile/RenderFile';
import { useState } from 'react';
export default function DragDrop(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { allVideos } = useAllVideos();
  const videoPlayerOptions = {
    width: '550',
    height: '300',
    autoPlay: false,
    displayDetails: true,
  };
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };
  return (
    <Container>
      <Typography variant="h3" align="center">
        dragdrop
      </Typography>

      <Grid spacing={2} container>
        {/* <Draggable> */}
        <Grid xs={3} item>
          <Card style={{ width: '100%', height: '200px', backgroundColor: 'yellow' }}>
            <DraggableCard text={'right'} bgcolor={'blue'} />
          </Card>
        </Grid>{' '}
        {/* </Draggable> */}
        {/* <Draggable> */}
        <Grid xs={3} item>
          <Card style={{ width: '100%', height: '200px', backgroundColor: 'yellow' }}>
            <DraggableCard text={'left'} bgcolor={'green'} />
          </Card>
        </Grid>{' '}
        {/* </Draggable> */}
        {/* <Draggable> */}
        <Grid xs={3} item>
          <Card style={{ width: '100%', height: '200px', backgroundColor: 'yellow' }}>
            <DraggableCard text={'right'} bgcolor={'pink'} />
          </Card>
        </Grid>{' '}
        {/* </Draggable> */}
      </Grid>

      {/* <DropZone open={open && !file} onHandleClose={handleClose} onSetFile={setFile} />
      <RenderFile
        onHandleClose={handleClose}
        file={file}
        open={file ? true : false}
        onSetFile={setFile}
        setOpen={setOpen}
      /> */}
    </Container>
  );
}

const DraggableCard = ({ text, bgcolor }: { text: string; bgcolor: string }): JSX.Element => {
  return (
    <Draggable>
      <Card style={{ width: '40%', backgroundColor: bgcolor }}>
        <Button>start</Button>
        <Typography variant="h6">{text}</Typography>
      </Card>
    </Draggable>
  );
};
