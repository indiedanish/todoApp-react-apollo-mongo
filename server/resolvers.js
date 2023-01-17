import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Task = mongoose.model("Task");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    tasks: async () => await Task.find({}).populate("by", "_id firstName"),
    itask: async (_, { by }) => await Task.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    tasks: async (ur) => await Task.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User dosent exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createTask: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      const newTask = new Task({
        name,
        by: userId,
      });
      await newTask.save();
      return "Task saved successfully";
    },

    deleteTask: async (_, { _id }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      const task = await Task.findOne({ _id });
      if (!task) throw new Error("Task not found");
      if (task.by.toString() !== userId)
        throw new Error("You are not authorized to delete this task");
      await Task.deleteOne({ _id });
      return "Task deleted successfully";
    },

    updateTask: async (_, { _id }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      const task = await Task.findOne({ _id });
      if (!task) throw new Error("Task not found");
      if (task.by.toString() !== userId)
        throw new Error("You are not authorized to delete this task");
      task.completed = true;
      await task.save();
      return "Task marked completed successfully";
    },
  },
};

export default resolvers;
