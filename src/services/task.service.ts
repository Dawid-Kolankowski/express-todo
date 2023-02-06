import { ITaskInputWithUser } from './../schema/task.schema';
import TaskModel, { ITaskDocument } from '../models/task.model';
import { IUserTokenDecoded } from './../models/user.model';
import NotFoundError from '../errors/notFound.error';
import { UnauthorizedError } from '../errors';

export const getTasks = async (user: IUserTokenDecoded): Promise<{ data: ITaskDocument[]; count: number }> => {
  const tasks = await TaskModel.find({ user: user.id });

  return { data: tasks, count: tasks.length };
};

export const createTask = async (input: ITaskInputWithUser): Promise<ITaskDocument> => {
  const task = await TaskModel.create(input);

  return task;
};

export const updateTask = async (id: string, input: ITaskInputWithUser, user: IUserTokenDecoded): Promise<ITaskDocument> => {
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new NotFoundError('Resource not found');
  }

  if (String(task.user) !== user.id) {
    throw new UnauthorizedError('User is not authorized to perform operation on this resource');
  }

  const updatedTask = await TaskModel.findByIdAndUpdate(id, input, { new: true });

  if (!updatedTask) {
    throw new Error('Unexpected error occured');
  }

  return updatedTask;
};

export const deleteTask = async (id: string, user: IUserTokenDecoded): Promise<ITaskDocument> => {
  const task = await TaskModel.findById(id);

  if (!task) {
    throw new NotFoundError('Resource not found');
  }

  if (String(task.user) !== user.id) {
    throw new UnauthorizedError('User is not authorized to perform operation on this resource');
  }

  await task.delete();

  return task;
};
