import PostModel from "../Models/Post.js";

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { date, author, title, introduction } = req.body;

    // Find the post by id and update it
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { date, author, title, introduction },
      { new: true } // This will return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
