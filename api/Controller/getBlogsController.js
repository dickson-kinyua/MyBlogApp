import mongoose from "mongoose";

import PostModel from "../Models/Post.js";

export const getBlogs = async (req, res) => {
  try {
    const allBlogs = await PostModel.find({});

    if (!allBlogs) {
      return res.status(400).json({ error: "Failed to fetch" });
    }

    res.status(200).json(allBlogs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
