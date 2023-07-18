import React from "react";
import AdviceRec from "./QuoteRec";
import SongRec from "./SongRec";
import QuoteRec from "./QuoteRec";
import { Mood as MoodModel} from "../models/mood";

 interface MoodRecProps {
  rec: any,
  moodClicked: MoodModel
} 

const MoodRec = ({rec, moodClicked}: MoodRecProps) => {
  
  if(rec && rec.rectype === "advice") {
    return (<div id="moodrec"><AdviceRec rec={rec} moodClicked={moodClicked}></AdviceRec></div>)
  } else if (rec && rec.rectype === "song") {
    return (<div id="moodrec"><SongRec rec={rec} moodClicked={moodClicked}></SongRec></div>)
  } else if (rec && rec.rectype === "quote") {
    return (<div id="moodrec"><QuoteRec rec={rec} moodClicked={moodClicked}></QuoteRec></div>)
  } else { 
    return (
      <></>
    )
  }
};

export default MoodRec;