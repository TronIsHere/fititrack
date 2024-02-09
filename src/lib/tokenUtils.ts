const jwt = require("jsonwebtoken");

export const generateVerificationToken = async (email: string) => {
  console.log(process.env.JWT_SECRET);
  const expiresIn = "1h"; // Token will expire in 1 hour
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign({ email }, secretKey, { expiresIn });

  return { token };
};
export const decodeVerificationToken = async (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const email = decoded.email;
  return email;
};
