import jwt from "jsonwebtoken";

const generateToken = (shopId, res) => {
  const token = jwt.sign({ id: shopId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  console.log(" Generated Token:");
  return token;
};
export default generateToken;
