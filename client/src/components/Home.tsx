import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Mood as MoodModel } from '../models/mood';
import { Advice as AdviceModel} from "../models/advice";
import { Quote as QuoteModel} from "../models/quote";
import { Song as SongModel} from "../models/song";
import { User } from "../models/user";
import MoodRec from './MoodRec';
import * as MoodAPI from '../network/mood_api';
import { Typography } from '@mui/material';
import { moodList } from '../assets/moodList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center', 
  color: theme.palette.text.secondary,
}));

interface HomeProps {
  loggedInUser: User | null,
}

const Home = ({loggedInUser}: HomeProps) => {
  const [rec, setRec] = useState< AdviceModel | SongModel | QuoteModel >();
  const [moodClicked, setMoodClicked] = useState<MoodModel>();

  useEffect(() => {
    if (rec) {
      const element = document.getElementById("moodrec");
      element?.scrollIntoView({behavior:"smooth", block:"nearest"});
    };
  },[rec])

  const onMoodClicked = async(moodObj: MoodModel) => {
    setMoodClicked(moodObj);
    const mood = moodObj.mood.toLowerCase();
    try {
      const response = await MoodAPI.getRec(mood);
      setRec(response);
      console.log(response);
      //only add to user mood to profile if logged in
      if (loggedInUser) {
        await MoodAPI.addUserMood(mood);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <div className="home-div">
        <Typography variant="h2" sx={{textAlign: 'center', mb: 3}}>What's your mood today?</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 9, md: 12 }}> 
            {moodList.map((mood) => (
              <Grid item xs={3} key={mood.mood}>
                <Item elevation={0} sx={{backgroundColor:"transparent"}}>
                  <img src={mood.image} alt={mood.mood} className="moodIcon" onClick={(e) => onMoodClicked(mood)}/>
                  <Typography variant="body1">{mood.mood}</Typography>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      {moodClicked && <MoodRec rec={rec} moodClicked={moodClicked}></MoodRec>}
    </>
  )
};

export default Home;

//add alert if they already added a mood for the day - only 1 mood per day 
//in demo mood add a - login in or signup to add ur mood now, and add to database if they login or sign up