import { Router } from "express";
import {
  loginPage,
  registerPage,
  homePage,
  myArticlePage,
  register,
  login,
  addArticle,
  viewArticle,
  deleteArticle,
  editArticle,
  updateArticle
} from "../controller/index.js";

import { auth, userAuth } from "../middleware/auth.js";

const router = Router();

// AUTH
router.get("/login", loginPage);
router.get("/register", registerPage);
router.post("/register", register);
router.post("/login", login);

// HOME
router.get("/", auth, homePage);

// ARTICLE
router.get("/myArticle", userAuth, myArticlePage);
router.post("/myArticle", userAuth, addArticle);
router.get("/viewArticle", userAuth, viewArticle);
router.get("/delete/:id", userAuth, deleteArticle);
router.get("/edit/:id", userAuth, editArticle);
router.post("/update/:id", userAuth, updateArticle);

export default router;
