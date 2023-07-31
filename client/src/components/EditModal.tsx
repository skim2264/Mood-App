import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
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

interface EditModalProps {
  date: string,
}

const EditModal = ({date}: EditModalProps) => {
  const editUserMood = async(date:string, userMood:string) => {
    try {
      const response = await MoodAPI.editUserMood(date, userMood);
      if (response) {
        alert(`Mood on ${new Date(date).toDateString()} changed to ${userMood}.`)
        window.location.reload();
      };
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <>
      <div className="editmodal-div">
        <Typography variant="h1" sx={{textAlign: 'center', mb: 3}}>Edit your mood</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 9, md: 12 }}> 
            {moodList.map((mood) => (
              <Grid item xs={3} key={mood.mood}>
                <Item elevation={0} sx={{backgroundColor:"transparent"}}>
                  <img src={mood.image} alt={mood.mood} className="moodIcon" onClick={(e) => editUserMood(date, mood.mood)}/>
                  <Typography variant="body1">{mood.mood}</Typography>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  )
};

export default EditModal;
