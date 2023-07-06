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
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  name: string,
  username: string,
  passsword: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
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
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST"});
}

//Methods to modify user mood - may modify input to put and delete routes
export interface UserMoodInput {
  day: string,
  mood: string,
}

export async function addUserMood(userMood: UserMoodInput): Promise<UserMood> {
  const response = await fetchData("/api/mood/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMood),
  });
  return response.json();
}

export async function editUserMood(userMood: UserMoodInput): Promise<UserMood> {
  const response = await fetchData(`/api/profile/${userMood.day}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMood),
  });
  return response.json();
}

export async function deleteUserMood(userMood: UserMoodInput): Promise<UserMood> {
  const response = await fetchData(`/api/profile/${userMood.day}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userMood),
  });
  return response.json();
}

export async function getUserMood(userMood: UserMoodInput): Promise<UserMood> {
  const response = await fetchData(`/api/profile/${userMood.day}`, { method: "GET" });
  return response.json();
}

//Get recommedation based on user mood
export async function getRec(userMood: UserMoodInput): Promise<Advice | Song | Quote> {
  const response = await fetchData(`/api/profile/${userMood.mood}`, { method: "GET" });
  return response.json();
}
 
//Get list of all mood options - call this in home and remove the call there
export async function getAllMoods(): Promise<Mood[]> {
  const response = await fetchData(`/api/mood/`, { method: "GET" });
  return response.json();
}