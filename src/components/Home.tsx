import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Login from './Login';
import { Mood as MoodModel } from '../models/mood';
import { Advice as AdviceModel} from "../models/advice";
import { Quote as QuoteModel} from "../models/quote";
import { Song as SongModel} from "../models/song";
import { User } from "../models/user";
import MoodRec from './MoodRec';
import * as MoodAPI from '../network/mood_api';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface HomeProps {
  loggedInUser: User | null,
  moodList: MoodModel[],
}

const Home = ({loggedInUser, moodList}: HomeProps) => {
  const [rec, setRec] = useState< AdviceModel | SongModel | QuoteModel >();
  
  //have the parent (app.tsx) have setState that is passed down to Home and state passed to MoodRec
  //Pass down the mood and have mood rec fetch from API the recommendation
  //Toggle visibility of MoodRec after fetched from API and have transition scroll down to Mood Rec screen

  //make a home page? - make an account or run demo where mood isn't saved

  useEffect(() => {
    if (rec) {
      const element = document.getElementById("moodrec");
      element?.scrollIntoView({behavior:"smooth", block:"nearest"});
    };
  },[rec])

  const onMoodClicked = async(mood: string) => {
    try {
      const response = await MoodAPI.getRec(mood);
      setRec(response);
      console.log(response);
      if (loggedInUser) {
        await MoodAPI.addUserMood(mood);
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  //add if not logged in - login or sign up to save mood rec

  return (
    <>
      <div className="home-div">
        <h1>What's your mood today?</h1>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10 }}>
            {moodList.map((mood) => (
              <Grid item xs={2} key={mood._id}>
                <Item><img src={mood.image} alt={mood.mood} onClick={(e) => onMoodClicked(mood.mood)}/></Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>

      <MoodRec rec={rec}></MoodRec>
    </>
  )
};

export default Home;