import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customApi.error';
import UnauthenticatedError from './unauthenticated.error';
import NotFoundError from './notFound.error';
import BadRequestError from './badRequest.error';
import UnauthorizedError from './unauthorized.error';

type ICustomError = {
  message: string;
  statusCode: StatusCodes;
};

export { ICustomError, CustomAPIError, UnauthenticatedError, NotFoundError, BadRequestError, UnauthorizedError };
