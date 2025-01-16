import PostModel from "../Models/Post.js";
import { missingInput } from "./missingInputs.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createPost = async (req, res) => {
  const { author, title, introduction } = req.body;

  //renaming and saving file as a string

  const { originalname, path } = req.file;
  const splitOriginalName = originalname.split(".");
  const extension = splitOriginalName[splitOriginalName.length - 1];
  const newFileName = path + "." + extension;
  fs.renameSync(path, newFileName);
  console.log(newFileName);

  if (missingInput([title, author, introduction])) {
    return res
      .status(400)
      .json({ error: "PLease fill in all the required fields" });
  }

  const token = req.cookies?.token;

  try {
    jwt.verify(token, process.env.SECRET, {}, async (error, userInfo) => {
      if (error) throw error;

      const post = await PostModel.create({
        cover: newFileName,
        author,
        title,
        introduction,
        author: userInfo.id,
      });

      if (!post) {
        return res.status(400).json({ error: "Unexpected error,try again" });
      }
      res.status(200).json(post);
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
