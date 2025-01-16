import express from "express";

const router = express.Router();

import multer from "multer";
const uploadMiddleware = multer({ dest: "uploads/" });

import { registerFn } from "../Controller/registerController.js";
import { loginFn } from "../Controller/loginController.js";
import { profile } from "../Controller/getProfileController.js";
import { logout } from "../Controller/logoutController.js";
import { createPost } from "../Controller/newPostController.js";
import { getBlogs } from "../Controller/getBlogsController.js";
// import { blogDetails } from "../Controller/getSingleBlogController.js";
import { deleteSinglePost } from "../Controller/deletePostControler.js";
import { updatePost } from "../Controller/updatePostController.js";
import { singleBlog } from "../Controller/getSingleBlogController.js";

router.post("/registerFn", registerFn);
router.post("/loginFn", loginFn);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/createPost", uploadMiddleware.single("file"), createPost);
router.get("/blogs", getBlogs);
router.get("/blogDetails/:id", singleBlog);
router.delete("/deletePost/:id", deleteSinglePost);
router.put("/updatePost/:id", updatePost);

export default router;
