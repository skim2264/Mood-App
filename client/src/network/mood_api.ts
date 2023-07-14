import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import { UserMood } from "../models/userMood";
import { Mood } from "../models/mood";
import { Advice } from "../models/advice";
import { Quote } from "../models/quote";
import { Song } from "../models/song";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
  }
}

//Authentication functions
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users", { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
  return response.json();
}

export interface LoginCredentials {
  username: string,
  password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("http://localhost:5000/api/users/logout", { method: "POST"});
}

//Methods to modify user mood - may modify input to put and delete routes
/* export interface UserMoodInput {
  day: string,
  mood: string,
} */

export async function addUserMood(userMood: string): Promise<UserMood> {
  const response = await fetchData("http://localhost:5000/api/mood/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMood),
  });
  return response.json();
}

export async function editUserMood(date:string): Promise<UserMood> {
  const response = await fetchData(`http://localhost:5000/api/profile/${date}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function deleteUserMood(date:string): Promise<UserMood> {
  const response = await fetchData(`http://localhost:5000/api/profile/${date}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export async function getUserMood(date:string): Promise<UserMood> {
  const response = await fetchData(`http://localhost:5000/api/profile/${date}`, { method: "GET" });
  return response.json();
}

//Get recommedation based on user mood
export async function getRec(userMood: string): Promise<Advice | Song | Quote> {
  const response = await fetchData(`http://localhost:5000/api/mood/${userMood}`, { method: "GET" });
  return response.json();
}
 
//Get list of all mood options - call this in home and remove the call there
export async function getAllMoods(): Promise<Mood[]> {
  const response = await fetchData("http://localhost:5000/api/mood/", { method: "GET" });
  return response.json();
}