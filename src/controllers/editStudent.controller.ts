import { Response } from "express";
import StudentService from "../services/student.service";
import UserService from "../services/user.service";

export const editStudent = async (req: any, res: Response) => {
  const { name, subjectName, marks, _id } = req.body;
  const { id } = req.params;
  const studentService = new StudentService();
  const userResponse = await studentService.editStudent(
    name,
    subjectName,
    marks,
    id
  );
  if (userResponse.status == 200) {
    return res.status(200).json(userResponse["student"]);
  } else if (userResponse.status == 404) {
    return res.status(500).json({
      message: userResponse.error,
    });
  } else {
    return res.status(500).json({ message: "Some error Occurred" });
  }
};
