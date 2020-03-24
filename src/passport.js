import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import passportGoogle from "passport-google-oauth";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
  googleLoginCallback
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy({
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION ?
        `https://thawing-journey-31791.herokuapp.com${routes.githubCallback}` : `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStrategy({
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: process.env.PRODUCTION ?
        `https://thawing-journey-31791.herokuapp.com${routes.facebookCallback}` : `http://localhost:4000${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

const GoogleStrategy = passportGoogle.OAuth2Strategy

passport.use(
  new GoogleStrategy({
      clientID: process.env.GG_ID,
      clientSecret: process.env.GG_SECRET,
      callbackURL: process.env.PRODUCTION ?
        `https://thawing-journey-31791.herokuapp.com${routes.googleCallback}` : `http://localhost:4000${routes.googleCallback}`,
      scope: ["profile", "email"]
    },
    googleLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());