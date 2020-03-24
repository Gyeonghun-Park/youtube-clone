import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
  githubLogin,
  postGithubLogIn,
  getMe,
  facebookLogin,
  postFacebookLogIn,
  googleLogin,
  postGoogleLogIn
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: routes.login,
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
  }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", {
    failureRedirect: routes.login,
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
  }),
  postFacebookLogIn
);

globalRouter.get(routes.google, googleLogin);

globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", {
    failureRedirect: routes.login,
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
  }),
  postGoogleLogIn
);

export default globalRouter;
