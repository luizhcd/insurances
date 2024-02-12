import BaseError from "./baseError";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends BaseError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;