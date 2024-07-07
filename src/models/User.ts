import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

const emailValidator = {
  validator: function (email) {
    // Regular expression for validating email format
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },
  message: (props) => `${props.value} is not a valid email address!`,
};

const passwordValidator = {
  validator: function (password) {
    return password.length >= 4;
  },
  message: (props) => `Minimum length is 4 characters.`,
};

export interface IUser extends Document {
  _id: string;
  password: string;
  email: string;
  students: string[];
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, required: true },
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: emailValidator,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    validate: passwordValidator,
  },
  students: [{ type: [String], ref: "Student" }],
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
