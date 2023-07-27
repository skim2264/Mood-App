import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Calendar from "./Calendar";

const Profile = () => {
  return (
    <Box className="profile-div">
      <Typography variant="h1" sx={{textAlign: 'center'}}>MY MOOD TRACKER</Typography>
      <Calendar></Calendar>
    </Box>
  )
};

export default Profile;