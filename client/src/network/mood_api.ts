import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { User } from "../models/user";
import { UserMood } from "../models/userMood";
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

const host = "https://mood-app-server-production.up.railway.app";

//Authentication functions
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(`${host}/api/users`, { method: "GET", credentials: 'include' });
  return response.json();
}

export interface SignUpCredentials {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(`${host}/api/users/signup`, {
    method: "POST",
    credentials: 'include',
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
  const response = await fetchData(`${host}/api/users/login`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logout() {
  await fetchData(`${host}/api/users/logout`, { method: "POST", credentials: 'include'});
}

export async function addUserMood(userMood: string): Promise<UserMood> {
  const response = await fetchData(`${host}/api/mood/`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"mood":userMood}),
  });
  return response.json();
}

export async function editUserMood(date:string, userMood: string): Promise<UserMood> {
  const response = await fetchData(`${host}/api/profile/${date}`, {
    method: "PUT",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"mood": userMood})
  });
  return response.json();
}

export async function deleteUserMood(date:string): Promise<UserMood> {
  const response = await fetchData(`${host}/api/profile/${date}`, {
    method: "DELETE",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

//get user mood by day
 export async function getUserMoodByDate(date:Date) {
  const response = await fetchData(`${host}/api/profile/date/${date}`, { method: "GET", credentials: 'include', });
  return response.json();
} 

//get user mood by month
export async function getUserMoodByMonth(date:Date): Promise<UserMood[]> {
  const response = await fetchData(`${host}/api/profile/month/${date}`, { method: "GET", credentials: 'include', });
  return response.json();
}

//Get recommedation based on user mood
export async function getRec(userMood: string): Promise<Advice | Song | Quote> {
  const response = await fetchData(`${host}/api/mood/${userMood}`, { method: "GET", credentials: 'include'});
  return response.json();
}
 
export async function getUserMoodList() {
  const response = await fetchData(`${host}/api/users/moodList`, { method: "GET", credentials: 'include'});
  return response.json();
}