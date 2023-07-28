import { Song as SongModel} from "../models/song";
import { Box, CssBaseline, Grid, Icon, SvgIcon, Typography } from "@mui/material";
import { Mood as MoodModel} from "../models/mood";
import YouTubeIcon from '@mui/icons-material/YouTube';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import record from "../assets/record.jpg";

 interface MoodRecProps {
  rec: SongModel,
  moodClicked: MoodModel
} 
//add spotify widget instead

const SongRec = ({rec, moodClicked}: MoodRecProps) => {

  return ( 
      <Grid container component="main" className="moodrec-div-main" id="songrec">
        <CssBaseline/>
        <Grid container item 
          className="song-div-left rec-padding"
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
              <img src={moodClicked.image} alt={moodClicked.mood} className="moodIconSmall" ></img>
              <Typography variant="h1" sx={{mt: 2, textAlign: 'center'}}>YOUR MOOD IS <span style={{color:`${moodClicked.color}`}}>{moodClicked.mood}</span></Typography>
            </Grid>
            <Grid item sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="subtitle1">Listening to music has the remarkable ability to uplift spirits, evoke positive emotions, and enhance overall mood.</Typography> 
            </Grid>
        </Grid>

        <Grid container item 
          className="song-div-right rec-padding"
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
            <Typography variant="h2" sx={{textAlign: 'center'}}>{rec.title}</Typography>
            <Typography variant="subtitle2" sx={{mt: 1}}>{rec.artist}</Typography>
            <Box
              sx={{
                position: 'relative', 
                display: 'flex', 
                justifyContent: 'center', 
                alignContent: 'center',
                flexWrap:'wrap', 
                backgroundImage: `url(${record})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                width: '300px',
                height: '300px', 
                borderRadius: '50%',
                mb: 3,
                mt: 3,
                boxShadow: "3px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                filter: "opacity(80%)"
              }}>
              <Box sx={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
                <FastRewindIcon sx={{fontSize: '60px'}} color="secondary"/> 
                <PlayArrowIcon sx={{fontSize: '60px', fontWeight: 100, border:"3px solid white", borderRadius: "50%", mx: 4}} color="secondary"/>
                <FastForwardIcon sx={{fontSize: '60px'}} color="secondary"/> 
              </Box>
            </Box>
          </Grid>
          <Grid item>
              <a href={rec.link} target="_blank" rel="noreferrer" className="youtube-link"><YouTubeIcon sx={{fontSize: '50px'}}/></a>
          </Grid>
        </Grid>
      </Grid>
  )
};

export default SongRec;