import React, {useState, useEffect} from "react";
import * as MoodAPI from "../network/mood_api";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Calendar from "./Calendar";

const Profile = () => {

  /* const editUserMood = async(date:string) => {
    try {
      const response = await MoodAPI.editUserMood(date);
      
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const deleteUserMood = async(date:string) => {
    try {
      const response = await MoodAPI.editUserMood(date);
      
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }; */
  
  return (
    <Box className="profile-div">
      <Typography variant="h1" sx={{textAlign: 'center'}}>MY MOOD TRACKER</Typography>
      <Calendar></Calendar>
    </Box>
  )
};

export default Profile;