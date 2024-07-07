import User from "../models/User";

export default class UserService {
  public getUserDetails = async (id: string) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          error: "User not found",
          status: 404,
        };
      }
      return {
        data: user,
        status: 200,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };
  public addStudentsToUser = async (id: string, studentId: string) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $push: {
          students: studentId,
        },
      });
      return {
        data: user,
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
  public getAllStudents = async (id: string) => {
    try {
      const user = await User.aggregate([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "userId",
            as: "students",
          },
        },
      ]);
      if (!user) {
        return {
          error: "User not found",
          status: 404,
        };
      }
      return {
        data: user[0].students,
        status: 200,
      };
    } catch (error) {
      return {
        error: (error as Error).message,
        status: 500,
      };
    }
  };

  public deleteStudentFromUser = async (id: string, studentId: string) => {
    try {
      const user = await User.findByIdAndUpdate(id, {
        $pull: {
          students: studentId,
        },
      });
      return {
        data: user,
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
}
