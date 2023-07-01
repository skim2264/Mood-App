import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import MoodRec from './components/MoodRec';

function App() {
  return (
    <div className="app-div">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="/recommendation" element={<MoodRec></MoodRec>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
