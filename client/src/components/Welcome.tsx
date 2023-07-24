import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import loginImg from "../assets/dreambed.jpg";

const Welcome = () => {
  
  return (
    <Container className="welcome-div" 
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center'
      }}>
      <Typography variant="h2" color="secondary" sx={{mb:3}}>mood</Typography>
      <img src={loginImg} alt="Bed in the clouds" className="circleImage welcome-image"/>
      <Typography variant="body1">"Believe you can, and you're halfway there." -Theodore Roosevelt</Typography>
      <Grid container sx={{mt: 6}}>
        <Grid item xs={4}><NavLink to="/home" className="welcome-link">Try now</NavLink></Grid>
        <Grid item xs={4}><NavLink to="/login" className="welcome-link">Login</NavLink></Grid>
        <Grid item xs={4}><NavLink to="/signup" className="welcome-link">Signup</NavLink></Grid>
      </Grid>
      
    </Container>
  )
};

export default Welcome;