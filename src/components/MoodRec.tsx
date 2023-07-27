import AdviceRec from "./AdviceRec";
import SongRec from "./SongRec";
import QuoteRec from "./QuoteRec";
import { Mood as MoodModel} from "../models/mood";
import { Box, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { User } from "../models/user";

 interface MoodRecProps {
  rec: any,
  moodClicked: MoodModel,
  loggedInUser: User | null,
} 

const MoodRec = ({rec, moodClicked, loggedInUser}: MoodRecProps) => {
  
  if(rec && rec.rectype === "advice") {
    return (
      <div id="moodrec">
        <Box className="moodrec-div">
          <AdviceRec rec={rec} moodClicked={moodClicked}></AdviceRec>
          {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1">Your mood has been recorded in your <NavLink to="/profile">profile.</NavLink></Typography>
              <Typography variant="body1">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1"><NavLink to="/login">Login</NavLink> to track your mood for a better day!</Typography>
            </Container>
          }
        </Box>
        
      </div>)
  } else if (rec && rec.rectype === "song") {
    return (
      <div id="moodrec">
        <Box className="moodrec-div">
          <SongRec rec={rec} moodClicked={moodClicked}></SongRec>
          {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1">Your mood has been recorded in your <NavLink to="/profile">profile.</NavLink></Typography>
              <Typography variant="body1">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1"><NavLink to="/login">Login</NavLink> to track your mood for a better day!</Typography>
            </Container>
          }
        </Box>
        
      </div>)
  } else if (rec && rec.rectype === "quote") {
    return (
      <div id="moodrec">
        <Box className="moodrec-div">
        <QuoteRec rec={rec} moodClicked={moodClicked}></QuoteRec>
        {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1">Your mood has been recorded in your <NavLink to="/profile">profile.</NavLink></Typography>
              <Typography variant="body1">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body1"><NavLink to="/login">Login</NavLink> to track your mood for a better day!</Typography>
            </Container>
          }
        </Box>
      </div>)
  } else { 
    return (
      <></>
    )
  }
};

export default MoodRec;