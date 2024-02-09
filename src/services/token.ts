import axios from "axios";

export const getTokenVerificationOnServer = async (token: string) => {
  try {
    const response = await axios.post("/api/auth/tokenVerify", {
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating workout:", error);
  }
};
