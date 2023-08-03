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
      <Box id="moodrec" className="moodrec-div">
          <AdviceRec rec={rec} moodClicked={moodClicked}></AdviceRec>
          {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2">Your mood has been recorded in your <NavLink to="/profile" className="rec-profile-link">profile</NavLink>.</Typography>
              <Typography variant="body2">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2"><NavLink to="/login" className="rec-login-link">Login</NavLink> to start tracking your mood for a better day!</Typography>
            </Container>
          }
        </Box>)
  } else if (rec && rec.rectype === "song") {
    return (
      <Box id="moodrec" className="moodrec-div">
          <SongRec rec={rec} moodClicked={moodClicked}></SongRec>
          {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2">Your mood has been recorded in your <NavLink to="/profile" className="rec-profile-link">profile.</NavLink></Typography>
              <Typography variant="body2">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2"><NavLink to="/login" className="rec-login-link">Login</NavLink> to start tracking your mood for a better day!</Typography>
            </Container>
          }
        </Box>)
  } else if (rec && rec.rectype === "quote") {
    return (
      <Box id="moodrec" className="moodrec-div">
        <QuoteRec rec={rec} moodClicked={moodClicked}></QuoteRec>
        {loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2">Your mood has been recorded in your <NavLink to="/profile" className="rec-profile-link">profile.</NavLink></Typography>
              <Typography variant="body2">Track your mood to have a better day.</Typography>
            </Container>
          }
          {!loggedInUser &&
            <Container sx={{textAlign: 'center', mt: 3}}>
              <Typography variant="body2"><NavLink to="/login" className="rec-login-link">Login</NavLink> to start tracking your mood for a better day!</Typography>
            </Container>
          }
        </Box>)
  } else { 
    return (
      <></>
    )
  }
};

export default MoodRec;