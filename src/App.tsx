import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import './styles/App.scss';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import { Mood } from './models/mood';
import { User } from "./models/user";
import * as MoodAPI from "./network/mood_api";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

//set theme for MUI
const theme = createTheme({
  typography: {
    fontFamily: [
      'inter',
      '-apple-system',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body2: {
      fontStyle: 'oblique'
    }
  },
  palette: {
    common: {
      black: "rgba(67, 67, 67, 1)"
    },
    secondary: {
      main: "rgb(255,255,255)"
    }
  }
});

function App() {
  //Add to top button like in my Porfolio
  //maybe add a cute custom cursor

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  //get logged in user
  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await MoodAPI.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app-div">
        <BrowserRouter>
          <Navbar 
            loggedInUser={loggedInUser} 
            onLogoutSuccess={() => setLoggedInUser(null)}
          />
          <Routes>
            <Route path="/" element={<Welcome></Welcome>}></Route>
            <Route path="/home" element={<Home loggedInUser={loggedInUser}></Home>}></Route>
            <Route path="/login" element={<Login onLoginSuccess={(user) => setLoggedInUser(user)}></Login>}></Route>
            <Route path="/signup" element={<Signup onSignupSuccess={(user) => setLoggedInUser(user)}></Signup>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
