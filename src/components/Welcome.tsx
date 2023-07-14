import React from "react";
import { NavLink } from "react-router-dom";

const Welcome = () => {
  
  return (
    <div className="welcome-div">
      <h1>Welcome to Mood</h1>
      <p>Hello</p>
      <img src="" alt=""></img>
      <NavLink to="/home">Try now</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink> 
    </div>
  )
};

export default Welcome;