import User from "../models/User";

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function async(email, password, cb) {
      console.log(email, password);
      return User.findOne({ email })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          user
            .comparePassword(password)
            .then((isMatch) => {
              if (!isMatch) {
                return cb(null, false, {
                  message: "Incorrect email or password.",
                });
              }
              return cb(null, user, { message: "Logged In Successfully" });
            })
            .catch((err) => {
              console.log(err);
              return cb(err);
            });
        })
        .catch((err) => {
          console.log(err);
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed
      return User.findById(jwtPayload._id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
