import { Request, Response } from "express";
import UserService from "../services/user.service";

export const getuserDetails = async (req: any, res: Response) => {
  const userService = new UserService();
  console.log(req.user);

  const userResponse = await userService.getUserDetails(req.user._id);
  if (userResponse.status == 200) {
    const tokens = userResponse.data;
    return res.status(200).json(tokens);
  } else if (userResponse.status == 404) {
    return res.status(500).json({
      message: userResponse.error,
    });
  } else {
    return res.status(500).json({ message: "Some error Occurred" });
  }
};

export const getAllStudents = async (req: any, res: Response) => {
  const userService = new UserService();

  const userResponse = await userService.getAllStudents(req.user._id);
  if (userResponse.status == 200) {
    const data = userResponse.data;
    return res.status(200).json(data);
  } else if (userResponse.status == 404) {
    return res.status(500).json({
      message: userResponse.error,
    });
  } else {
    return res.status(500).json({ message: "Some error Occurred" });
  }
};
