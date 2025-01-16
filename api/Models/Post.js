import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    cover: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const PostModel = new mongoose.model("post", PostSchema);

export default PostModel;
