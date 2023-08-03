import { useEffect, useState } from 'react';
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
      element?.scrollIntoView({behavior:"smooth", block:"start"});
    };
  },[rec])

  const onMoodClicked = async(moodObj: MoodModel) => {
    setMoodClicked(moodObj);
    const mood = moodObj.mood.toLowerCase();
    try {
      //alert user if they already logged their mood for the day
      if (loggedInUser) {
        const alreadyLogged = await MoodAPI.getUserMoodByDate(new Date());
        if (alreadyLogged) {
          alert("You have already logged your mood today, go to your profile if you want to edit or delete your logged moods!");
          return;
        }
      };
      const response = await MoodAPI.getRec(mood);
      setRec(response);
      //only add to user mood to profile if logged in
      if (loggedInUser) {
        await MoodAPI.addUserMood(mood);
      };
      
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
      <Box className="home-div">
        <Box className="home-div-main">
          <Typography variant="h1" sx={{textAlign: 'center', mb: 3}}>What's your mood today?</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ md: 5 }} columns={{ md: 12 }} sx={{display: 'flex', justifyContent: 'center'}}> 
              {moodList.map((mood) => (
                <Grid item xs={3} key={mood.mood} sx={{display: 'flex', alignContent: 'center'}}>
                  <Item elevation={0} sx={{backgroundColor:"transparent"}}>
                    <img src={mood.image} alt={mood.mood} className="moodIcon" onClick={(e) => onMoodClicked(mood)}/>
                    <Typography variant="body2" sx={{fontWeight: 700}}>{capitalizeFirst(mood.mood)}</Typography>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {moodClicked && <MoodRec rec={rec} moodClicked={moodClicked} loggedInUser={loggedInUser}></MoodRec>}
      </Box>

      

  )
};

export default Home;
