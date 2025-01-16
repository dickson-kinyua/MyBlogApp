import { useState } from "react";
import { UserContext } from "./UserContext";

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [blogs, setBlogs] = useState([]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, blogs, setBlogs }}>
      {children}
    </UserContext.Provider>
  );
};
