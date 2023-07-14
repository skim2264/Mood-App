import "dotenv/config";
import MoodModel from "./models/mood";
import AdviceModel from "./models/advice";
import QuoteModel from "./models/quote";
import SongModel from "./models/song";
import fs from "fs";

//Import data to MongoDB
const moodData = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/moods.json`, 'utf-8'));

//save a song
const adviceData = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/advice.json`, 'utf-8'));
//save advice
const quoteData = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/quotes.json`, 'utf-8'));
//save a quote
const songData = JSON.parse(fs.readFileSync(`${__dirname}/_seedData/songs.json`, 'utf-8'));

export const importData = async () => {   
  try {
    //delete all in collection
    await MoodModel.deleteMany();
    await AdviceModel.deleteMany();
    await QuoteModel.deleteMany();
    await SongModel.deleteMany();

    //create new in collection
    await MoodModel.create(moodData);
    await AdviceModel.create(adviceData);
    await QuoteModel.create(quoteData);
    await SongModel.create(songData);
    console.log('data successfully imported');
    process.exit();
  } catch (error) {
    console.log('error', error);
  }
}
