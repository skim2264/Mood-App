import { Advice as AdviceModel} from "../models/advice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Mood as MoodModel} from "../models/mood";
import { Box, CssBaseline, Icon } from "@mui/material";

 interface MoodRecProps {
  rec: AdviceModel,
  moodClicked: MoodModel
} 

const AdviceRec = ({rec, moodClicked}: MoodRecProps) => {

  return (
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
            <Typography variant="h1" sx={{mt: 2, textAlign: 'center'}}>YOUR MOOD IS <span style={{color:`${moodClicked.color}`}}>{moodClicked.mood}</span></Typography>
        </Grid>

        <Grid item 
          className="advice-div-right"
          sm={6} 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: "0px 50px"
        }}>
          <Box 
            sx={{
              border:"2px solid #7094C3", 
              borderRadius: "50%",  
              width: "80px", 
              height: "80px", 
              color: "#7094C3",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}>
            <Icon
              sx={{
                color: "#7094C3",
                margin: "auto",
                fontSize: "2.8rem"
              }}>
              {rec.image}
          </Icon>
          </Box>
          
          <Typography variant="h3" sx={{mb: 4, mt: 2}}>{rec.title}</Typography>
          <Typography variant="body1" sx={{mt: 1}}>{rec.description}</Typography>
        </Grid>
      </Grid>
  )
};

export default AdviceRec;

//add image or icon 