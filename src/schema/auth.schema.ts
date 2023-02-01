import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export const refreshTokenSchema = object({
  body: object({
    refreshToken: string({
      required_error: 'Refresh token is required',
    }),
  }),
});

export type ILoginInput = TypeOf<typeof loginSchema>['body'];
export type IRefreshTokenInput = TypeOf<typeof refreshTokenSchema>['body'];
