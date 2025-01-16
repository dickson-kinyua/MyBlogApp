import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../Models/UserModel.js";

export const profile = async (req, res) => {
  const token = req.cookies?.token;
  // console.log(token);

  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }

  try {
    // Verify the JWT token
    // const userInfo = jwt.verify(token, process.env.SECRET);

    jwt.verify(token, process.env.SECRET, {}, (error, userInfo) => {
      if (error) throw error;
      res.json(userInfo);
    });
  } catch (error) {
    console.error("JWT Error: ", error);
    return res
      .status(500)
      .json({ error: "Internal server error while processing the token" });
  }
};
