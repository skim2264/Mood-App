import React, { useState} from 'react';
import { Box, Button, Grid, Popover, Typography } from "@mui/material";
import { UserMood } from "../models/userMood";
import * as MoodAPI from "../network/mood_api";
import { moodList } from '../assets/moodList';
import { Mood as MoodModel } from '../models/mood';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface CalendarDaysProps {
  date: Date,
  changeCurrentDay: any,
  monthMoods: UserMood[]
}

interface dayData {
  currentMonth: string,
  date: string,
  month: string,
  number: string,
  selected: string,
  year: string,
  mood: string,
  image: string,
  color: string
}

export default function CalendarDays({date , changeCurrentDay , monthMoods}: CalendarDaysProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [clickedData, setClickedData] = useState<dayData | null>(null);

  const openPopup = (event: React.MouseEvent<HTMLElement>, day:any) => {
    if (event.currentTarget === anchorEl) { handleClose()};
    setAnchorEl(event.currentTarget);
    changeCurrentDay(day);
    if (day.mood) {
      setClickedData(day);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setClickedData(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const currentDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const weekdayOfFirstDay = currentDate.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      currentDate.setDate(currentDate.getDate() - 7);
    } else if (day === 0) {
      currentDate.setDate(currentDate.getDate() + (day - weekdayOfFirstDay));
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    };

    let moodObj: MoodModel | undefined = { mood: "", image: "", color: "" };
    const index = monthMoods.findIndex(obj => { return new Date(obj.day).toDateString() === currentDate.toDateString()});

    if (index !== -1) {
      const mood = monthMoods[index].mood;
      //add back when in production mode - double re-rendering in development messing it up
      //monthMoods.splice(index,1);
      moodObj = moodList.find(moodItem => moodItem.mood === mood);
    } 
    
    let calendarDay = {
      currentMonth: (currentDate.getMonth() === date.getMonth()),
      date: (new Date(currentDate)),
      month: currentDate.getMonth(),
      number: currentDate.getDate(),
      selected: (currentDate.toDateString() === date.toDateString()),
      year: currentDate.getFullYear(),
      mood: moodObj?.mood,
      image: moodObj?.image,
      color: moodObj?.color
    }

    currentDays.push(calendarDay);
  };

  return (
    <Grid container className="table-content">
      {currentDays.map((day) => {
          return (
            <Grid item xs={12/7} className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                   onClick={(e) => openPopup(e, day)}
                   sx={{display: 'flex'}}>
               {day.mood && (<div className="calendar-badge" style={{backgroundColor: day.color}}>  </div>)}
              <p>{day.number}</p>
            </Grid>
          )
      })}
      {clickedData && <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{ "& .MuiPopover-paper": { backgroundColor: 'transparent' } }}
        >
          <Box
          sx={{
            position: "relative",
            mt: "10px",
            "&::before": {
              backgroundColor: "#E7E3ED",
              content: '""',
              display: "block",
              position: "absolute",
              width: 12,
              height: 12,
              top: -6,
              transform: "rotate(45deg)",
              left: "calc(50% - 6px)"
            }
          }}
        />
          <div className="calendar-popup">
            <div className="popoverButtons">
              <Button>Edit</Button>
              <Button><DeleteForeverIcon sx={{padding:0, margin:0}}/></Button>
            </div>
            <img src={clickedData.image} alt={clickedData.mood} className="moodIconSmall" ></img>
            <Typography sx={{mt: 1}} style={{color:`${clickedData.color}`}}>{clickedData.mood.toUpperCase()}</Typography> 
            <Typography sx={{mb: 2}}> was Recorded</Typography> 
          </div>
          
      </Popover>}
    </Grid>
  )
};