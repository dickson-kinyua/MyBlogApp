import PostModel from "../Models/Post.js";

export const deleteSinglePost = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const postToDelete = await PostModel.findOneAndDelete({ _id: id });

    if (!postToDelete) {
      return res.status(400).json({ error: "no post found" });
    }

    res.status(200).json("Post deleted successfully");
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
