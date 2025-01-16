import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

export const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    author: "",
    introduction: "",
    date: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/blogDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log("Error fetching post data", err));
  }, [id]);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  //   console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/updatePost/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post updated:", data);
        navigate(`/blogs/${id}`); // Redirect to the post page
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  return (
    <div>
      <p>Update post</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 mt-5">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={post.title}
          className="bg-gray-100 p-4 rounded-xl"
        />
        <input
          type="text"
          name="author"
          onChange={handleChange}
          value={post.author}
          className="bg-gray-100 p-4 rounded-xl"
        />
        <input
          type="text"
          name="introduction"
          onChange={handleChange}
          value={post.introduction}
          className="bg-gray-100 p-4 rounded-xl"
        />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={post.date}
          className="bg-gray-100 p-4 rounded-xl"
        />
        <button type="submit" className="bg-custom_pm p-4 rounded-xl">
          Update Post
        </button>
      </form>
    </div>
  );
};
