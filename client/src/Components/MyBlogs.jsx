import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext/UserContext";
import { LoginPage } from "../Pages/LoginPage";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export const MyBlogs = () => {
  const { userInfo, blogs, setBlogs } = useContext(UserContext);
  // const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (JSON.stringify(data) !== JSON.stringify(blogs)) {
          setBlogs(data);
        }
      })
      .catch((error) => console.log(error));
  }, [blogs]); // Empty array ensures this effect runs only once

  function trimToFirstFullstop(paragraph) {
    // Find the index of the first full stop (.)
    let index = paragraph.indexOf(".");

    // If a full stop is found, return the substring up to and including it
    if (index !== -1) {
      return paragraph.substring(0, index + 1);
    } else {
      // If no full stop is found, return the entire paragraph
      return paragraph;
    }
  }

  return (
    <div className="w-full">
      {userInfo && (
        <div className="flex flex-col gap-10 mt-10 w-full">
          {blogs.map((blog) => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              className="bg-orange-100 p-4"
            >
              <div className="grid grid-cols-2 gap-3 cursor-pointer w-full">
                <div className="h-52 w-full">
                  <img
                    src={`http://localhost:5000/${blog.cover}`}
                    alt="cover photo"
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{blog.title}</p>
                  <time> {format(new Date(blog.createdAt), "yyyy-MM-dd")}</time>
                  {/* <p>{trimToFirstFullstop(blog.introduction)}</p> */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: trimToFirstFullstop(blog.introduction),
                    }}
                  ></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!userInfo && (
        <div className="w-full">
          <LoginPage />
        </div>
      )}
    </div>
  );
};
