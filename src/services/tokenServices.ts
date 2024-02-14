import axios from "axios";

export const getTokenVerificationOnServer = async (token: string) => {
  try {
    const response = await axios.post("/api/auth/token-verify", {
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error :", error);
  }
};
export const ResendTokenOnServer = async (email: string) => {
  try {
    const response = await axios.post("/api/auth/token-resend", {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
};
