import React from "react";
import { Song as SongModel} from "../models/song";

 interface MoodRecProps {
  rec: SongModel
} 

const SongRec = ({rec}: MoodRecProps) => {

  return (
    <div className="moodrec-div" id="songrec">
      <h1>Your Mood is {rec.mood}</h1>
      <p>{rec.title}</p>
      <p>{rec.artist}</p>
      <img src={rec.image} alt={rec.mood}/>
    </div>
  )
};

export default SongRec;