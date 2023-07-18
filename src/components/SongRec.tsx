import React from "react";
import { Song as SongModel} from "../models/song";
import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { Mood as MoodModel} from "../models/mood";
import YouTubeIcon from '@mui/icons-material/YouTube';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';

import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

 interface MoodRecProps {
  rec: SongModel,
  moodClicked: MoodModel
} 
//add spotify widget instead

const SongRec = ({rec, moodClicked}: MoodRecProps) => {

  return (
    <Box className="moodrec-div">
      <Grid container component="main" className="moodrec-div-main" id="songrec">
        <CssBaseline/>
        <Grid container item 
          sm={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <img src={moodClicked.image} alt={moodClicked.mood} className="moodIcon" ></img>
              <Typography variant="h3" sx={{mt: 2}}>YOUR MOOD IS <span style={{color:`${moodClicked.color}`}}>{moodClicked.mood.toLowerCase()}</span></Typography>
            </Grid>
            <Grid item sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2">Listening to music has the remarkable ability to uplift spirits, evoke positive emotions, and enhance overall mood.</Typography> 
            </Grid>
        </Grid>

        <Grid container item 
          sm={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <Grid item sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
            <Typography variant="h2">{rec.title}</Typography>
            <Typography variant="body2" sx={{mt: 1}}>{rec.artist}</Typography>
            <Box
              sx={{
                position: 'relative', 
                display: 'flex', 
                justifyContent: 'center', 
                alignContent: 'center',
                flexWrap:'wrap', 
                backgroundImage: `url(${rec.image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                width: '300px',
                height: '300px', 
                borderRadius: '50%',
                mb: 3,
                mt: 3
              }}>
              <Box sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
                <FastRewindIcon sx={{fontSize: '60px'}} color="secondary"/>
                <PlayCircleOutlinedIcon sx={{fontSize: '60px'}} color="secondary"/>
                <FastForwardIcon sx={{fontSize: '60px'}} color="secondary"/> 
              </Box>
            </Box>
          </Grid>
          <Grid item>
              <YouTubeIcon sx={{fontSize: '50px'}}/>
          </Grid>
        </Grid>
      </Grid>
      <Container sx={{textAlign: 'center', mt: 3}}>
        <Typography variant="body1">Your mood has been recorded in your profile.</Typography>
        <Typography variant="body1">Track your mood to have a better day.</Typography>
      </Container>
    </Box>
  )
};

export default SongRec;