import bcryptjs from "bcryptjs";
const salt = bcryptjs.genSaltSync(10);
import UserModel from "../Models/UserModel.js";
import { missingInput } from "./missingInputs.js";

export const registerFn = async (req, res) => {
  const { fullNames, email, password } = req.body;

  if (missingInput([fullNames, email, password])) {
    return res
      .status(400)
      .json({ error: "Please fill in all the required fields" });
  }

  try {
    const checkUserExist = await UserModel.findOne({ email });

    if (checkUserExist) {
      return res.status(400).json({ error: "User email already exists" });
    }

    const newUser = await UserModel.create({
      fullNames,
      email,
      password: bcryptjs.hashSync(password, salt),
    });

    if (!newUser) {
      return res.status(400).json({ error: "Something happened,try again" });
    }

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
