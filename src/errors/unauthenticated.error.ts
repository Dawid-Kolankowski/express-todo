import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './customApi.error';

class UnauthenticatedError extends CustomAPIError {
  statusCode: StatusCodes;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
