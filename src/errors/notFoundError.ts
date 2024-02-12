import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError"; 

class NotFoundError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
