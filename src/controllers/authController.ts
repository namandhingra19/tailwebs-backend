import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import passport from "passport";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const userId = `USR-${randomUUID()}`;

    const user = new User({ email, password, _id: userId });
    await user.save();
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      "your_jwt_secret"
    );
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const login = (req: any, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      console.log(user);
      if (typeof user !== "object" || Array.isArray(user) || user === null) {
        return res.status(500).json({ message: "Invalid payload" });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
        },
        "your_jwt_secret"
      );
      return res.json({ user, token });
    });
  })(req, res);
};

export const logout = (req: any, res: Response) => {
  req.logout();
  res.status(200).json({ message: "Logged out successfully" });
};
