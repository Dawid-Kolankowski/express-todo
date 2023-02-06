import { deleteTask, updateTask } from './../services/task.service';
import { ITaskInput, ITaskInputWithUser } from './../schema/task.schema';
import { IUserLocals } from './../models/user.model';
import { Request, Response } from 'express';
import { createTask, getTasks } from '../services/task.service';

export const getTasksHandler = async (req: Request, res: Response<{}, IUserLocals>) => {
  const { user } = res.locals;
  const tasks = await getTasks(user);
  res.send(tasks);
};

export const createTaskHandler = async (req: Request<{}, {}, ITaskInput>, res: Response<{}, IUserLocals>) => {
  const { user } = res.locals;

  const input = req.body;
  const inputWithUser = { ...input, user: user.id };

  const task = await createTask(inputWithUser);
  res.send(task);
};

export const updateTaskHandler = async (req: Request<{ id: string }, {}, ITaskInputWithUser>, res: Response<{}, IUserLocals>) => {
  const input = req.body;
  const { id } = req.params;
  const { user } = res.locals;

  const task = await updateTask(id, input, user);
  res.send(task);
};

export const deleteTaskHandler = async (req: Request<{ id: string }, {}, {}>, res: Response<{}, IUserLocals>) => {
  const { id } = req.params;
  const { user } = res.locals;

  const task = await deleteTask(id, user);
  res.send(task);
};
