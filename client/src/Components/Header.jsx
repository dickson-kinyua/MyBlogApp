import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext/UserContext";

export const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }

        const data = await response.json();
        console.log(data);
        if (JSON.stringify(userInfo) !== JSON.stringify(data)) {
          setUserInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [userInfo]);

  const logoutFn = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }

      const message = await response.json();
      setUserInfo(null);
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mb-16">
      <Link
        to={"/"}
        className="font-bold text-2xl flex flex-col justify-center items-center "
      >
        D-blogs
      </Link>
      {/* <nav className="flex flex-row gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/blogs"}>Notes</Link>
      </nav> */}
      <div className="flex flex-row gap-3 items-center ">
        {userInfo && (
          <>
            <button onClick={logoutFn}>Logout</button>
            <Link to={"/createPost"}>Create new post</Link>
          </>
        )}
        {!userInfo && (
          <>
            <Link to={"/register"}>Sign up</Link>
            <Link
              to={"/login"}
              className="bg-black text-white py-2 px-4 rounded-3xl"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
