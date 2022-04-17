import mongoose from "mongoose";

export interface ITask {
  _id: mongoose.ObjectId;
  title: string;
  body: string;
}

const TaskSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default Task;
