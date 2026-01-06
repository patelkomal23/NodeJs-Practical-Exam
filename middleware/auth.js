import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.redirect("/login");
  }
  next();
};

export const userAuth = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};
