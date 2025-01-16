import { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContext";
import { LoginPage } from "./LoginPage";
import { Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const CreatePost = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [error, setError] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const resetFields = () => {
    setFile("");
    setTitle("");
    setIntroduction("");
    setError(null);
    setAuthor("");
  };

  const createPost = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.set("title", title);
    data.set("author", author);
    data.set("introduction", introduction);
    data.set("file", file[0]);

    try {
      const response = await fetch("http://localhost:5000/createPost", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        setError(errorMessage.error);
        return;
      }

      const json = await response.json();
      console.log(json);
      resetFields();
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="w-full">
      <h3 className="font-bold text-3xl">Create a new post</h3>
      {userInfo && (
        <form className="flex flex-col gap-4 mt-10" onSubmit={createPost}>
          <div className="flex flex-row gap-20">
            <div className="w-full flex flex-col gap-5">
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                id="title"
                className="bg-gray-100 p-4 rounded-2xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-5">
              <label htmlFor="author">Author :</label>
              <input
                type="text"
                id="author"
                className="bg-gray-100 p-4 rounded-2xl"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-5">
            <label htmlFor="details">Details :</label>
          </div>
          <ReactQuill
            theme="snow"
            className="h-28 mb-10"
            id="details"
            value={introduction}
            // readOnly={false}
            onChange={setIntroduction}
          ></ReactQuill>

          <input
            type="file"
            className="bg-gray-100 p-4 rounded-2xl"
            onChange={(e) => setFile(e.target.files)}
          />
          {error && <div className="text-red-600">{error}</div>}
          <button className="bg-custom_pm p-4 rounded-2xl">Create Post</button>
        </form>
      )}
      {!userInfo && <LoginPage />}
    </div>
  );
};
