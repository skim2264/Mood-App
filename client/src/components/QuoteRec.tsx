import React from "react";
import { Quote as QuoteModel} from "../models/quote";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Mood as MoodModel} from "../models/mood";
import { Box, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

 interface MoodRecProps {
  rec: QuoteModel,
  moodClicked: MoodModel
} 

const QuoteRec = ({rec, moodClicked}: MoodRecProps) => {

  return (
      <Stack component="main" className="moodrec-div-main rec-padding" id="quoterec"
        sx={{
          display: 'flex',
          justifyContent: 'center'
      }}>
        <Stack 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2
        }}>
          <img src={moodClicked.image} alt={moodClicked.mood} className="moodIconSmall" ></img>
          <Typography variant="h3" sx={{mt: 2}}>YOUR MOOD IS <span style={{color:`${moodClicked.color}`}}>{moodClicked.mood.toLowerCase()}</span></Typography>
        </Stack>
        <hr></hr>
        <Stack 
          sx={{
            mt: 2,
            mx: 4,
            textAlign: 'center'
        }}>
          <Typography variant="body1">{rec.quote}</Typography>
          <Typography variant="body2">-{rec.author}</Typography>
        </Stack>
      </Stack>
  )
};

export default QuoteRec;