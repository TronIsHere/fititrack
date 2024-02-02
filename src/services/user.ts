import { TSleep, TWeight } from "@/components/types/DataTypes";
import axios from "axios";

export const fetchUserData = async (userEmail: string) => {
  try {
    const response = await axios.post("/api/user", { email: userEmail });
    const { character, email, name, age, weights, sleeps } = response.data.data;

    return {
      age,
      email,
      maxXp: character.maxXP,
      xp: character.xp,
      level: character.level,
      name,
      weight: weights,
      sleep: sleeps,
      darkMode: true,
    };
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null; // Or handle the error as per your application's needs
  }
};

export async function createUser(
  email: string,
  password: string,
  name: string
) {
  const response = await axios.post("/api/auth/signup", {
    email,
    password,
    name,
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
