import React, { useState, useEffect } from 'react';
import { Grid } from "@mui/material";
import { UserMood } from "../models/userMood";
import * as MoodAPI from "../network/mood_api";
import { daysToWeeks } from 'date-fns';

interface CalendarDaysProps {
  date: Date,
  changeCurrentDay: any,
  monthMoods: UserMood[]
}

export default function CalendarDays({date , changeCurrentDay , monthMoods}: CalendarDaysProps) {
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

    let mood = "";
    let moodColor = "";
    const index = monthMoods.findIndex(obj => { return new Date(obj.day).toDateString() === currentDate.toDateString()});

    if (index !== -1) {
      mood = monthMoods[index].mood;
      //add back when in production mode - double re-rendering in development messing it up
      //monthMoods.splice(index,1);
      if (mood === "excited") {
        moodColor = "#EACD4D";
      } else if (mood === "happy") {
        moodColor = "#7EBB7E";
      } else if (mood === "relaxed") {
        moodColor = "#7094C3";
      } else if (mood === "calm") {
        moodColor = "#5B82C3";
      } else if (mood === "bored") {
        moodColor = "#7967B6";
      } else if (mood === "sad") {
        moodColor = "#73548E";
      } else if (mood === "nervous") {
        moodColor = "#8D2727";
      } else if (mood === "irritated") {
        moodColor = "#8D2727";
      }
    }

    let calendarDay = {
      currentMonth: (currentDate.getMonth() === date.getMonth()),
      date: (new Date(currentDate)),
      month: currentDate.getMonth(),
      number: currentDate.getDate(),
      selected: (currentDate.toDateString() === date.toDateString()),
      year: currentDate.getFullYear(),
      mood: moodColor
    }

    currentDays.push(calendarDay);
  };

  return (
    <Grid container className="table-content">
      {currentDays.map((day) => {
          return (
            <Grid item xs={12/7} className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                   onClick={() => changeCurrentDay(day)}
                   sx={{display: 'flex'}}>
               {day.mood!== "" && (<div className="calendar-badge" style={{backgroundColor: day.mood}}>  </div>)}
              <p>{day.number}</p>
            </Grid>
          )
      })}
    </Grid>
  )
}