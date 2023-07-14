import React from "react";
import { Quote as QuoteModel} from "../models/quote";

 interface MoodRecProps {
  rec: QuoteModel
} 

const QuoteRec = ({rec}: MoodRecProps) => {

  return (
    <div className="moodrec-div" id="quoterec">
      <h1>Your Mood is {rec.mood}</h1>
      <p>{rec.quote}</p>
      <p>{rec.author}</p>
      <img src={rec.image} alt={rec.mood}/>
    </div>
  )
};

export default QuoteRec;