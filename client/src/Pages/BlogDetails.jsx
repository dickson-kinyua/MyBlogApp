import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const BlogDetails = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const [blog, setBlog] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const deletePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/deletePost/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }

      const json = await response.json();
      console.log(json);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch blog details by ID when the component mounts
    fetch(`http://localhost:5000/blogDetails/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((error) => console.log(error));
  }, [id]); // Re-run the effect when the `id` changes

  if (!blog) {
    return <div>Loading...</div>;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-20 flex flex-col gap-3 py-16 relative">
      <p>{blog.title}</p>
      <img
        className="w-full h-52"
        src={`http://localhost:5000/${blog.cover}`}
        alt="cover photo"
      />
      <p>{blog.createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.introduction }} />

      <Link to={`/update/${id}`}>
        <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
        Edit post
      </Link>
      <button onClick={deletePost} className="bg-custom_pm p-4 rounded-xl">
        Delete post
      </button>
      <Link to={"/"} className="absolute top-0 underline">
        Back to blogs
      </Link>
    </div>
  );
};
