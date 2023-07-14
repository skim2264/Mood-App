import React, {useState, useEffect} from "react";
import * as MoodAPI from "../network/mood_api";

const Profile = () => {
  //Needs to display mood data by data - ex. show the current month on first view
  //have options to look at whole year preview or previous months from scroll menu

  const getUserMood = async(date:string) => {
    try {
      const response = await MoodAPI.getUserMood(date);
      
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const editUserMood = async(date:string) => {
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
  };

  return (
    <div className="profile-div">

    </div>
  )
};

export default Profile;