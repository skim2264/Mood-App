import React from "react";
import { Advice as AdviceModel} from "../models/advice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Mood as MoodModel} from "../models/mood";
import Box from "@mui/material/Box";
import { Container, CssBaseline } from "@mui/material";
import { NavLink } from "react-router-dom";

 interface MoodRecProps {
  rec: AdviceModel,
  moodClicked: MoodModel
} 

const AdviceRec = ({rec, moodClicked}: MoodRecProps) => {

  return (
    <Box className="moodrec-div">
      <Grid container component="main" className="moodrec-div-main" id="advicerec">
        <CssBaseline/>
        <Grid item 
          className="advice-div-left rec-padding"
          sm={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img src={moodClicked.image} alt={moodClicked.mood} className="moodIconSmall" ></img>
            <Typography variant="h3" sx={{mt: 2}}>YOUR MOOD IS <span style={{color:`${moodClicked.color}`}}>{moodClicked.mood.toLowerCase()}</span></Typography>
        </Grid>

        <Grid item 
          className="advice-div-right rec-padding"
          sm={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <Typography variant="h2">{rec.title}</Typography>
          <Typography variant="body2" sx={{mt: 1}}>{rec.description}</Typography>
        </Grid>
      </Grid>

      <Container sx={{textAlign: 'center', mt: 3}}>
        <Typography variant="body1">Your mood has been recorded in your <NavLink to="/profile">profile.</NavLink></Typography>
        <Typography variant="body1">Track your mood to have a better day.</Typography>
      </Container>
    </Box>
  )
};

export default AdviceRec;