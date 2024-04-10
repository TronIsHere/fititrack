import { TSleep, TWeight } from "@/components/types/DataTypes";
import { generateVerificationToken } from "@/lib/tokenUtils";
import axios from "axios";
import { Resend } from "resend";

export const fetchUserData = async (userEmail: string) => {
  try {
    const response = await axios.post("/api/user", { email: userEmail });
    const { character, email, name, dob, weights, sleeps, workouts } =
      response.data.data;

    return {
      dob,
      email,
      maxXp: character.maxXP,
      xp: character.xp,
      level: character.level,
      name,
      weight: weights,
      sleep: sleeps,
      darkMode: true,
      workouts,
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null; // Or handle the error as per your application's needs
  }
};

export async function createUser(
  email: string,
  password: string,
  name: string,
  dob: string
) {
  const response = await axios.post("/api/auth/signup", {
    email,
    password,
    name,
    dob,
  });
  if (!response) {
    return { error: true, message: "Something went wrong." };
  }
  return { data: response.data, status: response.status };
}

export async function addXPToServer(fieldData: number, email: string) {
  try {
    const response = await axios.post("/api/user/add/character", {
      field: "xp",
      data: fieldData,
      email,
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
}
export const addWeightToServer = async (
  newWeightData: TWeight,
  email: string
) => {
  const response = await axios.post("/api/user/add/weight", {
    email,
    ...newWeightData,
  });

  return response.data;
};

export const addSleepToServer = async (newSleepData: TSleep, email: string) => {
  const response = await axios.post("/api/user/add/sleep", {
    email,
    ...newSleepData,
  });
  return response.data;
};
export const SendForgotPasswordEmail = async (email: string) => {
  const response = await axios.post("/api/auth/forgot-password-token", {
    email,
  });
  return response.data;
};
export const VerifyForgotPassword = async (
  password: string,
  confirmPassword: string,
  token: any
) => {
  const response = await axios.post("/api/auth/change-password", {
    password,
    confirmPassword,
    token,
  });
  return response.data;
};
