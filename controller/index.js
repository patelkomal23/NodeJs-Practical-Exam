import User from "../model/user.js";
import Article from "../model/article.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ===== PAGES =====
export const loginPage = (req, res) => {
  res.render("pages/login");
};

export const registerPage = (req, res) => {
  res.render("pages/register");
};

export const homePage = (req, res) => {
  res.render("pages/index");
};

export const myArticlePage = (req, res) => {
  res.render("pages/myArticle");
};

// ===== AUTH =====
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashPassword,
      role: "user"
    });

    res.redirect("/login");
  } catch (error) {
    console.log(error.message);
    res.redirect("/register");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.redirect("/login");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.redirect("/login");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.KEY
    );

    res.cookie("token", token);
    res.redirect(user.role === "admin" ? "/" : "/myArticle");
  } catch (error) {
    res.redirect("/login");
  }
};

// ===== ARTICLE =====
export const addArticle = async (req, res) => {
  await Article.create(req.body);
  res.redirect("/viewArticle");
};

export const viewArticle = async (req, res) => {
  const article = await Article.find({});
  res.render("pages/viewArticle", { article });
};

export const deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/viewArticle");
};

export const editArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("pages/editArticle", { article });
};

export const updateArticle = async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/viewArticle");
};
