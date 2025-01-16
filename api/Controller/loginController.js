import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import UserModel from "../Models/UserModel.js";
import { missingInput } from "./missingInputs.js";

const salt = bcryptjs.genSaltSync(10);
const SECRET = process.env.SECRET;

export const loginFn = async (req, res) => {
  const { email, password } = req.body;

  // Check for missing input
  if (missingInput([email, password])) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    // Check if user exists
    const checkEmail = await UserModel.findOne({ email });

    if (!checkEmail) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Asynchronous password comparison for better performance
    const passOk = await bcryptjs.compare(password, checkEmail.password);

    if (!passOk) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token and send response
    jwt.sign({ email, id: checkEmail._id }, SECRET, {}, (err, token) => {
      if (err) {
        console.error("JWT Error: ", err);
        return res
          .status(500)
          .json({ error: "Internal server error while generating token" });
      }

      // Set the token as a cookie and send success response
      res.cookie("token", token, { httpOnly: true }).json({
        email,
        id: checkEmail._id,
      });
    });
  } catch (error) {
    console.error("Server Error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
