import React from "react";
import AdviceRec from "./QuoteRec";
import SongRec from "./SongRec";
import QuoteRec from "./QuoteRec";

 interface MoodRecProps {
  rec: any
} 

const MoodRec = ({rec}: MoodRecProps) => {
  
  if(rec && rec.rectype === "advice") {
    return (<div id="moodrec"><AdviceRec rec={rec}></AdviceRec></div>)
  } else if (rec && rec.rectype === "song") {
    return (<div id="moodrec"><SongRec rec={rec}></SongRec></div>)
  } else if (rec && rec.rectype === "quote") {
    return (<div id="moodrec"><QuoteRec rec={rec}></QuoteRec></div>)
  } else { 
    return (
      <div className="moodrec-div" id="moodrec">
      </div>
    )
  }
};

export default MoodRec;