import { object, string } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Email is not valid'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short, should be atleast 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});
