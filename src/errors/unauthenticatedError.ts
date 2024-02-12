import { StatusCodes } from 'http-status-codes';
import BaseError from './baseError';

class UnauthenticatedError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
