import React from "react";
import { Advice as AdviceModel} from "../models/advice";

 interface MoodRecProps {
  rec: AdviceModel
} 

const AdviceRec = ({rec}: MoodRecProps) => {

  return (
    <div className="moodrec-div" id="advicerec">
      <h1>Your Mood is {rec.mood}</h1>
      <p>{rec.title}</p>
      <p>{rec.description}</p>
      <img src={rec.image} alt={rec.title}/>
    </div>
  )
};

export default AdviceRec;