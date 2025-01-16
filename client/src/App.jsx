// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Header } from "./Components/Header";
import { Blog } from "./Components/Blog";
// import { MainBlog } from "./Components/MainBlog";
import { MyBlogs } from "./Components/MyBlogs";
import { LoginPage } from "./Pages/LoginPage";
import { RegisterPage } from "./Pages/RegisterPage";
import { RegisterForm } from "./Pages/RegisterForm";
import { UserContextProvider } from "./UserContext/UserContextProvider";
import { CreatePost } from "./Pages/CreatePost";
import { BlogDetails } from "./Pages/BlogDetails";
import { UpdatePost } from "./Pages/UpdatePost";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div className="p-3 w-3/4 mx-auto">
          <Header />
          <div className="mx-auto mt-10">
            <Routes>
              <Route path="/" element={<MyBlogs />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/registerForm" element={<RegisterForm />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/update/:id" element={<UpdatePost />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
