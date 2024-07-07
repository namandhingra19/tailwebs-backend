import { Response } from "express";
import StudentService from "../services/student.service";
import UserService from "../services/user.service";

export const createStudents = async (req: any, res: Response) => {
  const { name, subjectName, marks } = req.body;
  const studentService = new StudentService();
  const userService = new UserService();

  const studentResponse = await studentService.updateMarkswithStudentName(
    subjectName,
    name,
    marks
  );
  if (studentResponse.status == 200) {
    return res.status(200).json(studentResponse.student);
  }

  const userResponse = await studentService.createStudent(
    name,
    subjectName,
    marks,
    req.user._id
  );
  const userRes = await userService.addStudentsToUser(
    req.user._id,
    userResponse["student"]._id
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
