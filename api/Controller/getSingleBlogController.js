import PostModel from "../Models/Post.js";

export const singleBlog = async (req, res) => {
  const { id } = req.params; // Get the ID from the URL

  try {
    const blog = await PostModel.findOne({ _id: id });
    if (blog) {
      res.status(200).json(blog); // Send the blog details as a response
    } else {
      res.status(404).json({ error: "Blog not found" }); // Handle case when blog isn't found
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
