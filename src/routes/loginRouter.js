import { Router } from "express";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  res.redirect("/home");
});

loginRouter.get("/login", (req, res) => {
  if (!req.session.user) {
    res.render("pages/login.hbs");
  } else {
    res.redirect("/home");
  }
});

loginRouter.get("/home", (req, res) => {
  if (req.session.user) {
    req.session.counter++;
    res.render("pages/home", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

loginRouter.post("/login", (req, res) => {
  try {
    const user = req.body.user;
    req.session.user = user;
    req.session.counter = 1;
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

loginRouter.get("/logout", (req, res) => {
  try {
    const name = req.session.user ? req.session.user : "";
    req.session.destroy();
    res.render("pages/logout", { mensaje: `Hasta luego ${name}` });
  } catch (error) {
    console.log(error);
  }
});

export default loginRouter;
