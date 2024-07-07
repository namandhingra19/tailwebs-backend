import Student from "../models/Student";
import { randomUUID } from "crypto";

export default class StudentService {
  public createStudent = async (
    name: string,
    subjectName: string,
    marks: number,
    userId: string
  ) => {
    try {
      const student = new Student();
      student._id = `STU-${randomUUID()}`;
      student.name = name;
      student.subjectName = subjectName;
      student.marks = marks;
      student.userId = userId;
      await student.save();
      return {
        student: student,
        status: 200,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };

  public editStudent = async (
    name: string,
    subjectName: string,
    marks: number,
    _id: string
  ) => {
    try {
      const student = await Student.findByIdAndUpdate(
        _id,
        {
          name: name,
          subjectName: subjectName,
          marks: marks,
        },
        { new: true }
      );
      return {
        student: student,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };

  public deleteStudent = async (_id: string) => {
    try {
      const student = await Student.findByIdAndDelete(_id);
      return {
        student: student,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };

  public updateMarkswithStudentName = async (
    subjectName: string,
    name: string,
    marks: number
  ) => {
    try {
      let student = await Student.findOne({
        subjectName: subjectName,
        name: name,
      });
      if (student) {
        student.marks = marks;
        await student.save();
        return {
          student: student,
          status: 200,
        };
      } else {
        return {
          error: "Student not found",
          status: 404,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };
}
