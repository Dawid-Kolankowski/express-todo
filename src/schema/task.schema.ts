import { boolean, object, string, TypeOf } from 'zod';

export const taskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string().optional(),
    state: boolean().optional(),
  }),
});

export type ITaskInput = TypeOf<typeof taskSchema>['body'];
export type ITaskInputWithUser = ITaskInput & { user: string };
