import { useState, useEffect, useRef } from 'react';
import CalendarDays from './CalendarDays';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../styles/calendar.scss';
import { Grid } from '@mui/material';
import * as MoodAPI from "../network/mood_api";
import { UserMood } from "../models/userMood";

const Calendar = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentDay, setCurrentDay] = useState(new Date());
  const [monthMoods, setMonthMoods] = useState<UserMood[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const currentDayRef = useRef(currentDay);

  const changeCurrentDay = (day: any) => {
    setCurrentDay(new Date(day.year, day.month, day.number))
  }

  const nextMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() + 1)));
    setTriggerFetch(true);
  }

  const previousMonth = () => {
    setCurrentDay(new Date(currentDay.setMonth(currentDay.getMonth() - 1)));
    setTriggerFetch(true);
  }

  const toCurrentDate = () => {
    setCurrentDay(new Date());
  }
  
  useEffect(() => {
    //get all user moods in month and add to calendar view
    const getUserMoodByMonth = async(date: Date) => {
      try {
        const response = await MoodAPI.getUserMoodByMonth(date);
        if (response) setMonthMoods(response);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };

    getUserMoodByMonth(currentDayRef.current);
    setTriggerFetch(false);
  },[triggerFetch]); 

return (
      <div className="calendar">
        <div className="calendar-header">
          <div className="title">
            <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
          </div>
          <div className="tools">
            <button onClick={previousMonth}>
              <ArrowBackIosIcon/>
            </button>
            <button onClick={toCurrentDate}>Today</button>
            <button onClick={nextMonth}>
              <ArrowForwardIosIcon/>
            </button>
          </div>
        </div>
        <div className="calendar-body">
          <Grid container className="table-header" >
            {
              weekdays.map((weekday) => {
                return <Grid item xs={12/7} className="weekday" sx={{textAlign: 'center'}} key={weekday}><p>{weekday}</p></Grid>
              })
            }
          </Grid>
          <CalendarDays date={currentDay}  changeCurrentDay={changeCurrentDay}  monthMoods={monthMoods}/>
        </div>
        <Grid container spacing={2} sx={{display: 'flex', justifyContent: 'center'}}>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#EACD4D'}}></div>
            <p>Excited</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#7EBB7E'}}></div>
            <p>Happy</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#7094C3'}}></div>
            <p>Relaxed</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#5B82C3'}}></div>
            <p>Calm</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#7967B6'}}></div>
            <p>Bored</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#73548E'}}></div>
            <p>Sad</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#8D2727'}}></div>
            <p>Nervous</p>
          </Grid>
          <Grid item sx={{display: 'flex', alignItems: 'center', gap: "10px"}}>
            <div className="legend-badge" style={{backgroundColor: '#8D2727'}}></div>
            <p>Irritated</p>
          </Grid>
        </Grid>
      </div>
  )
};

export default Calendar;