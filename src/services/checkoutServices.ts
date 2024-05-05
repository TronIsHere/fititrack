import axios from "axios";

export const validateCheckoutSessionId = async (
  sessionId: string,
  email: string
) => {
  const response = await axios.get(
    `/api/verify-checkout?sessionId=${sessionId}`
  );
  if (response.data.email !== email) {
    return false;
  }
  if (response.data.paid === false) {
    return false;
  }
  return true;
};
