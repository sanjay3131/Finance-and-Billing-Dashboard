import jwt from "jsonwebtoken";

const generateToken = (shopId, res) => {
  const token = jwt.sign({ id: shopId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  console.log(" Generated Token:");
  return token;
};
export default generateToken;
