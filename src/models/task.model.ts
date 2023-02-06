import mongoose, { ObjectId, Schema } from 'mongoose';

export type ITask = {
  title: string;
  description: string;
  status: boolean;
  user: ObjectId;
};

export type ITaskDocument = ITask & mongoose.Document;

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Boolean, default: false, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const TaskModel = mongoose.model<ITaskDocument>('Task', taskSchema);

export default TaskModel;
