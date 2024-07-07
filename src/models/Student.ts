import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  subjectName: string;
  marks: number;
  userId: string;
}

const StudentSchema: Schema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  subjectName: { type: String, required: true },
  marks: { type: Number, required: true },
  userId: { type: String, ref: "User" },
});

const Student = mongoose.model<IUser>("Student", StudentSchema);
export default Student;
